import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";  // นำเข้า JWT

// เชื่อมต่อ MongoDB
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Environment variable MONGODB_URI is not defined");
  }

  if (mongoose.connections[0].readyState) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ezyaccount",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("MongoDB connection failed");
  }
};

// สร้าง Schema พร้อม validation
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  address: { type: String, required: [true, "Address is required"], trim: true },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

// เพิ่ม index สำหรับการค้นหา
userSchema.index({ username: 1, email: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

// จัดการ POST request
export async function POST(req: Request) {
  
  await connectDB();

  try {
    const body = await req.json();

    // ตรวจสอบข้อมูลที่ส่งมา
    const requiredFields = [
      "name",
      "username",
      "address",
      "phone",
      "email",
      "password",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // ตรวจสอบความถูกต้องของข้อมูล
    const { phone, email, password, username } = body;

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: "Phone number must be 10 digits" },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่า username เป็นตัวอักษรหรือตัวเลขเท่านั้น
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return NextResponse.json(
        { error: "Username must only contain letters and numbers" },
        { status: 400 }
      );
    }

    // ตรวจสอบรหัสผ่าน
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 6 characters long and contain both letters and numbers",
        },
        { status: 400 }
      );
    }

    // ตรวจสอบผู้ใช้ซ้ำ (username และ email ต้องไม่ซ้ำ)
    const existingUser = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้งานหรืออีเมลนี้มีผู้ใช้แล้ว" },
        { status: 400 }
      );
    }

    // แปลงรหัสผ่านด้วย bcrypt ก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกข้อมูลลง MongoDB
    const newUser = new User({
      ...body,
      password: hashedPassword,
    });

    await newUser.save();

    // สร้าง JWT Token เพื่อให้ผู้ใช้สามารถเข้าสู่ระบบได้
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" } // กำหนดเวลาในการหมดอายุของ Token เป็น 1 วัน
    );

    return NextResponse.json(
      { message: "สมัครสมาชิกสำเร็จ!", token },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error occurred during user registration:", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดในการสมัครสมาชิก",
        details: error.message, // เพิ่มรายละเอียดข้อผิดพลาด
      },
      { status: 500 }
    );
  }
}
