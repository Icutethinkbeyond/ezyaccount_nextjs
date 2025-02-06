// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/connectDB"; 
import User from "@/models/User"; 

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // เชื่อมต่อกับฐานข้อมูล MongoDB
    await connectDB();

    // ค้นหาผู้ใช้จากอีเมล
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "อีเมลไม่ถูกต้อง" }, { status: 401 });
    }

    // เปรียบเทียบรหัสผ่านที่กรอกกับรหัสผ่านที่เก็บในฐานข้อมูล
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    // สร้าง JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!, // คุณต้องตั้งค่าตัวแปรนี้ใน .env
      { expiresIn: "1h" }
    );

    // คืนค่า token และข้อความสำเร็จ
    return NextResponse.json({
      message: "เข้าสู่ระบบสำเร็จ",
      token,
    });
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
