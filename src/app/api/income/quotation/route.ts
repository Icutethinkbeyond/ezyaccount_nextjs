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
        // worksheet.getCell('A1').value = 'ชื่อบริษัท';
        // worksheet.getCell('B1').value = 'ชื่อลูกค้า';
        // worksheet.getCell('A2').value = 'บริษัท ABC';
        // worksheet.getCell('B2').value = 'คุณสมชาย';

        // ======== For Download Excel ========
        await workbook.xlsx.writeFile(tempExcelPath);

        try {

            //Convert Excel To PDF
            // const { stdout, stderr } = await exec(`soffice --headless --convert-to pdf ${tempExcelPath} --outdir ${path.dirname(tempPdfPath)}`);
            await exec(`soffice --headless --convert-to pdf ${tempExcelPath} --outdir ${path.dirname(tempPdfPath)}`);
            // console.log('Output:', stdout);
            // console.error('Error:', stderr);
            // ตรวจสอบว่าไฟล์มีอยู่
            if (!fs.existsSync(tempPdfPath)) {
                console.log('File not found')
                return new NextResponse(JSON.stringify({ error: 'File not found' }), { status: 500 });
            }

            const fileBuffer = fs.readFileSync(tempPdfPath);

            // Remove Temp Files
            fs.unlinkSync(tempExcelPath);
            fs.unlinkSync(tempPdfPath);
    
            return new Response(fileBuffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename=example.pdf',
                },
            });

        } catch (error) {
            console.error(`Error: ${error}`);
            return new NextResponse(JSON.stringify({ error: 'Failed to convert file' }), { status: 500 });
        }

        // ======== For Download Excel ========
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