import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - ดึงรายชื่อลูกค้าทั้งหมด (ทุก Contactor)
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';

        const customers = await prisma.contactor.findMany({
            where: search ? {
                OR: [
                    { contactorName: { contains: search, mode: 'insensitive' } },
                    { contactorEmail: { contains: search, mode: 'insensitive' } },
                    { contactorTel: { contains: search, mode: 'insensitive' } },
                ]
            } : undefined,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// POST - สร้างลูกค้าใหม่ (Contactor)
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const {
            contactorName,
            contactorTel,
            contactorEmail,
            contactorAddress
        } = data;

        // Validation
        if (!contactorName) {
            return NextResponse.json({ error: 'ชื่อผู้ติดต่อจำเป็นต้องกรอก' }, { status: 400 });
        }

        // สร้าง Contactor
        const customer = await prisma.contactor.create({
            data: {
                contactorName,
                contactorTel: contactorTel || null,
                contactorEmail: contactorEmail || null,
                contactorAddress: contactorAddress || null,
            }
        });

        return NextResponse.json(customer, { status: 201 });
    } catch (error) {
        console.error("Error creating customer:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
