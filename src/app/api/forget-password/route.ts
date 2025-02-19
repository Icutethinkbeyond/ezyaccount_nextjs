import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

export const prisma = new PrismaClient();

// ฟังก์ชันสร้าง Token สำหรับการรีเซ็ตรหัสผ่าน
function generateResetToken(userId: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// ฟังก์ชันสำหรับการส่งอีเมล
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new NextResponse(
        JSON.stringify({ message: "กรุณากรอกอีเมล" }),
        { status: 400 }
      );
    }

    // ตรวจสอบผู้ใช้ในฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: {
        userEmail: email, 
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "ไม่พบผู้ใช้ในระบบ" }),
        { status: 404 }
      );
    }

    const token = generateResetToken(user.userId);
    const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'ลิงก์รีเซ็ตรหัสผ่าน',
      html: `
        <h1>ลิงก์รีเซ็ตรหัสผ่าน</h1>
        <p>กรุณาคลิกที่ลิงก์ด้านล่างเพื่อรีเซ็ตรหัสผ่านของคุณ:</p>
        <a href="${resetLink}">รีเซ็ตรหัสผ่าน</a>
      `,
    };

    // ส่งอีเมล
    await transporter.sendMail(mailOptions);

    return new NextResponse(
      JSON.stringify({ message: 'Email sent successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'เกิดข้อผิดพลาดในการส่งอีเมล', error }),
      { status: 500 }
    );
  }
}
