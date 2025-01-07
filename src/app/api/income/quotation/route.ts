import { NextRequest, NextResponse } from 'next/server';
import { NextApiResponse, NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

// แปลง exec ให้รองรับ Promises
const exec = promisify(execCallback);

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Path to your Excel template
        const templatePath = path.join(process.cwd(), 'public', 'templates', 'quotation-template-ezy.xlsx');
        const tempExcelPath = path.join(process.cwd(), 'public', 'temp', 'excels', 'temp.xlsx');
        const tempPdfPath = path.join(process.cwd(), 'public', 'temp', 'pdfs', 'temp.pdf');

        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template file not found at ${templatePath}`);
        }

        const workbook = new ExcelJS.Workbook();

        // Read the template file
        await workbook.xlsx.readFile(templatePath);

        // Get the first worksheet
        const worksheet = workbook.getWorksheet("QUOTE");

        if (!worksheet) {
            console.log('WorkSheet NotFound')
            return new NextResponse(JSON.stringify({ error: 'WorkSheet NotFound' }), { status: 404 });
        }

        // Example: Write data into specific cells
        //เลขเอกสารหรือเลขอ้างอิง
        worksheet.getCell("I5").value = "#1234567";
        // วันปัจจุบัน
        let currentDate = new Date();
        worksheet.getCell("B2").value = currentDate;
        // เพิ่ม 30 วัน
        let futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 30);
        worksheet.getCell("D2").value = futureDate;
        worksheet.getCell("D2").alignment = { horizontal: "left" };
        // เพิ่มข้อมูลบริษัท
        worksheet.getCell("A3").value = "[ชื่อบริษัท]";
        worksheet.getCell("A4").value = "[ที่อยู่]";
        worksheet.getCell("A5").value = "[เบอร์โทร]";
        worksheet.getCell("A6").value = "[เลขที่เสียภาษี]";
        worksheet.getCell("A7").value = "[E-mail]";

        // เพิ่มข้อมูลลูกค้า
        worksheet.getCell("A9").value = "ลูกค้า";
        worksheet.getCell("A10").value = "[ที่อยู่]";
        worksheet.getCell("A11").value = "[เบอร์โทร,e-mail]";

        // เพิ่มข้อมูลสินค้า
        // ตัวอย่างข้อมูล JSON
        const jsonData = [
            {
            product: "Service Fee 1",
            qty: 1,
            price: 120.0,
            discount: 0,
            total: 120.0,
            },
            {
            product: "Service Fee 6",
            qty: 1,
            price: 30.0,
            discount: 0,
            total: 30.0,
            },
            {
            product: "Service Fee 11",
            qty: 2,
            price: 50.0,
            discount: 0,
            total: 50.0,
            },
            {
            product: "Service Fee 16",
            qty: 3,
            price: 200.0,
            discount: 0,
            total: 200.0,
            },
        ];
        // ใช้ลูปเพื่อใส่ข้อมูลจาก JSON ไปยังคอลัมน์ A, E, F, G, H (แถว 15 ถึง 30)
        let rowIndex = 15; // เริ่มต้นจากแถวที่ 15
        jsonData.forEach((data, index) => {
            if (rowIndex + index <= 30) {
                // ตรวจสอบว่าแถวยังไม่เกินแถว 30
                worksheet.getCell(`A${rowIndex + index}`).value = data.product; // คอลัมน์ A
                worksheet.getCell(`E${rowIndex + index}`).value = data.qty; // คอลัมน์ E
                worksheet.getCell(`E${rowIndex + index}`).alignment = {
                vertical: "middle",
                horizontal: "center",
                };
                worksheet.getCell(`F${rowIndex + index}`).value = data.discount; // คอลัมน์ F
                worksheet.getCell(`F${rowIndex + index}`).alignment = {
                vertical: "middle",
                horizontal: "center",
                };
                worksheet.getCell(`G${rowIndex + index}`).value = data.price; // คอลัมน์ G
                worksheet.getCell(`H${rowIndex + index}`).value = data.total; // คอลัมน์ H
            }
        });
        worksheet.getCell("A36").value = "ใส่ข้อมูลหมายตามสมควรในเอกสารนี้";

        // Create a buffer of the modified Excel file
        // const buffer = await workbook.xlsx.writeBuffer();
        // Set headers for download
        // return new Response(buffer, {
        //     headers: {
        //         'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //         'Content-Disposition': 'attachment; filename=example.xlsx',
        //     },
        // });

    } catch (error) {
        console.error('Error fetching categories:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// export async function POST(req: NextRequest) {

//     try {

//         const { categoryName, categoryDesc } = await req.json() as Category;

//         // Validation
//         if (!categoryName) {
//             return new NextResponse(JSON.stringify('Category name is required'), { status: 400 });
//         }

//         //check name is exist
//         const nameIsAlready = await prisma.category.findFirst({ where: { categoryName: { equals: categoryName } } })

//         if (nameIsAlready) {
//             return new NextResponse(JSON.stringify('Category name is Already'), { status: 400 });
//         }

//         // Create a new category
//         const newCategory = await prisma.category.create({
//             data: {
//                 categoryName,
//                 categoryDesc,
//                 // equipments: equipments ? { connect: equipments } : undefined, // Assuming `equipments` is an array of IDs
//             },
//         });

//         return new NextResponse(JSON.stringify(newCategory), { status: 201 });

//     } catch (error) {

//         console.error("Error Connect Local Server:", error);
//         return new NextResponse(JSON.stringify({ error }), { status: 500 });

//     } finally {
//         await prisma.$disconnect();
//     }

// };

// export async function DELETE(req: NextRequest) {

//     try {
//         // รับ categoryId จาก query parameter
//         const { searchParams } = new URL(req.url);
//         const categoryId = searchParams.get('categoryId');

//         // ตรวจสอบว่ามี categoryId หรือไม่
//         if (!categoryId) {
//             return new NextResponse(JSON.stringify('Category ID is required'), { status: 400 });
//         }

//         // ลบ category โดยใช้ categoryId
//         const deletedCategory = await prisma.category.delete({
//             where: {
//                 categoryId,
//             },
//         });

//         // ส่งข้อมูล category ที่ถูกลบกลับ
//         return new NextResponse(JSON.stringify(deletedCategory), { status: 200 });
//     } catch (error: any) {
//         console.error('Error deleting category:', error);

//         if (error.code === 'P2025') {
//             // Prisma error code สำหรับการไม่พบ record ที่ต้องการลบ
//             return new NextResponse(JSON.stringify('Category not found'), { status: 404 });
//         }

//         return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// export async function PATCH(req: NextRequest) {

//     try {

//         const { categoryId, categoryName, categoryDesc } = await req.json() as Category;

//         if (!(categoryId && categoryName)) {
//             return new NextResponse(JSON.stringify('Category ID is required'), { status: 400 });
//         }

//         const updatedCategory = await prisma.category.update({
//             where: { categoryId: categoryId },
//             data: {
//                 categoryName, categoryDesc
//             },
//             // Update fields based on the request body
//         });

//         return new NextResponse(JSON.stringify(updatedCategory), { status: 200 });

//     } catch (error: any) {

//         console.error('Error updating category:', error);

//         if (error.code === 'P2025') {
//             // Prisma error code สำหรับการไม่พบ record ที่ต้องการลบ
//             return new NextResponse(JSON.stringify('Category not found'), { status: 404 });
//         }

//         return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// }