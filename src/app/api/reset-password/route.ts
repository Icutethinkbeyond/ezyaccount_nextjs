import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return new NextResponse(
        JSON.stringify({ message: 'กรุณากรอก token และ รหัสผ่านใหม่' }),
        { status: 400 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in .env');
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: 'Token ไม่ถูกต้องหรือหมดอายุ' }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); 

    await prisma.user.update({
      where: { userId: decoded.userId },
      data: { userPassword: hashedPassword },
    });

    return new NextResponse(
      JSON.stringify({ message: 'รีเซ็ตรหัสผ่านสำเร็จ' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน' }),
      { status: 500 }
    );
  }
}
