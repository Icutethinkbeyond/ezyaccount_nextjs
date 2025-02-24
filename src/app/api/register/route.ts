import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// POST method handler
export async function POST(req: Request) {
  try {
    const { name, username, address, phone, email, password, confirmPassword } = await req.json();

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!name || !username || !address || !phone || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: 'โปรดกรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }

    // ตรวจสอบรหัสผ่านและยืนยันรหัสผ่าน
    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน' }, { status: 400 });
    }

    // ตรวจสอบความแข็งแกร่งของรหัสผ่าน
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}/.test(password)) {
      return NextResponse.json({ message: 'รหัสผ่านต้องประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลขอย่างน้อย 8 ตัว' }, { status: 400 });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { userEmail: email },
    });
    
    if (existingEmail) {
      return NextResponse.json({ message: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 400 });
    }
    
    const existingUsername = await prisma.user.findFirst({
      where: { username: username },
    });
    
    if (existingUsername) {
      return NextResponse.json({ message: "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว" }, { status: 400 });
    }
    


    const role = await prisma.role.findFirst({
      where: {
        name: "User",
      },
    });

    if (!role) {
      return NextResponse.json({ message: "ไม่มี role นี้ในระบบ" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const [address1, subDistrict, city, state, postalCode, country] = address.split(',').map((item: string) => item.trim());

    if (!address1 || !subDistrict || !city || !state || !postalCode || !country) {
      return NextResponse.json({ message: 'ที่อยู่ไม่ครบถ้วน กรุณากรอกในรูปแบบที่ถูกต้อง' }, { status: 400 });
    }

    const customerId = `CUST-${Date.now()}-${Math.floor(Math.random() * 10000)}`;


    const newUser = await prisma.user.create({
      data: {
        name: name,
        username: username,
        phone: phone,
        userEmail: email,
        userPassword: hashedPassword,
        roleId: role.roleId,
        userStatus: 'Active',
        customerId: customerId,
        address: address ? {
          create: {
            address1: address1,
            subDistrict: subDistrict,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country
          }
        } : undefined,
        profile: {
          create: {
            profileName: name,
          }
        }
      }
    });

    return NextResponse.json({ message: 'ลงทะเบียนสำเร็จ', userId: newUser.userId, user: newUser }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error details:", (error as Error).message);
    return NextResponse.json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน', error: (error as Error).message }, { status: 500 });
  }
}
