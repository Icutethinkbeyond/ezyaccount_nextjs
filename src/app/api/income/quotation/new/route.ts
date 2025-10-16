import { NextRequest, NextResponse } from 'next/server';
import { DocumentStatus, eDocumentType, PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { FormDataFooter, HeadForm, Product } from '@/contexts/QuotationContext';
import { getMonthAbbreviation } from '@/utils/utils';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const { footerForm, headForm, products } = await req.json();
        let _footerForm = footerForm as FormDataFooter
        let _headForm= headForm as HeadForm
        let _products = products as Product[]

        console.log(_footerForm)
        console.log(_headForm)
        console.log(_products)

        let _docType = null;

        // if (documentType === "Maintenance") {
        //     _docType = "MA";
        // } else {
        //     _docType = "RT";
        // }

        // Get current month and year
        const now = new Date();
        const monthAbbr = getMonthAbbreviation(now.getMonth()); // getMonth() เริ่มที่ 0 = มกราคม
        const year = now.getFullYear().toString();

        // Find the latest document for current month/year/type
        const latestDocument = await prisma.documentPaper.findFirst({
            where: {
                // docType: _docType,
                docMonth: monthAbbr,
                docYear: year,
            },
            orderBy: {
                documentIdNo: 'desc', // เรียงจากมากไปน้อย
            },
            select: {
                documentIdNo: true,
            },
        });

        // Get new running number
        let newRunningNumber = 1;

        if (latestDocument?.documentIdNo) {
            const latestRunningNumber = parseInt(latestDocument.documentIdNo);
            if (!isNaN(latestRunningNumber)) {
                newRunningNumber = latestRunningNumber + 1;
            }
        }

        // Format running number to 5 digits
        const runningNumberStr = newRunningNumber.toString().padStart(5, '0');

        console.log(runningNumberStr)

        // Assemble the final ID
        // const documentCode = `${_docType}-${monthAbbr}-${year}-${runningNumberStr}`;


        // if (idNumberIsAlready) {

        //     if (idNumberIsAlready.documentStatus === DocumentStatus.Close) {
        //         return new NextResponse(JSON.stringify({ message: "เอกสารถูกปิดการเเก้ไขเเล้ว" }), { status: 400 });
        //     }

        //     if (idNumberIsAlready.documentStatus === DocumentStatus.Cancel) {
        //         return new NextResponse(JSON.stringify({ message: "เอกสารถูกยกเลิกเเล้ว" }), { status: 400 });
        //     }

        //     const unEditStatus = [
        //         "Approve",
        //         "WithdrawPart",
        //         "RepairStared",
        //         "RepairComplete",
        //     ];

        //     if (unEditStatus.includes(idNumberIsAlready.documentStep.toString()) && idNumberIsAlready.documentStatus === DocumentStatus.Open) {
        //         return new NextResponse(JSON.stringify({ message: "เอกสารได้รับการอนุมัติเเล้ว เเละอยู่ระหว่างดำเนินการ" }), { status: 400 });
        //     }

        //     try {

        //         await prisma.document.update({
        //             where: {
        //                 documentIdNo: documentIdNo,
        //                 AND: {
        //                     documentType: documentType
        //                 }
        //             },
        //             data: {
        //                 documentDetials,
        //             },
        //         });

        //         return new NextResponse(JSON.stringify({ message: "Updated Success", documentIdNo: idNumberIsAlready.documentIdNo, documentId: idNumberIsAlready.documentId }), { status: 200 });

        //     } catch (e) {
        //         return new NextResponse(JSON.stringify({ message: "Document Id Is Ready To Used", documentIdNo: idNumberIsAlready.documentIdNo, documentId: idNumberIsAlready.documentId }), { status: 400 });
        //     }

        // } else {

        // console.log(documentCode)

        // console.log('ไม่พบเอกสาร ระบบกำลังสร้างเอกสารใหม่')


        // if (documentType === DocumentCategory.Maintenance) {
        //     //สร้าง maintenance ด้วยยยย

        //     const {
        //         natureOfBreakdown,
        //         causes,
        //         repairingStart,
        //         repairingEnd,
        //         TOFstart,
        //         TOFend,
        //         maintenanceRamark,
        //         technicianName,
        //         plantEngineer,
        //         plantApproval,
        //         repairLocation,
        //         maintenanceType } = maintenance as Maintenance


        //     let documentAndMaintenance = await prisma.$transaction(async (tx) => {

        //         // Create a new document
        //         const newDocument = await prisma.document.create({
        //             data: {
        //                 docType: _docType,
        //                 documentIdNo: runningNumberStr,
        //                 docMonth: monthAbbr,
        //                 docYear: year,
        //                 documentDetials,
        //                 documentType,
        //                 documentStatus: DocumentStatus.Draft,
        //                 documentStep: repairLocation === LocationType.OnPlant ? DocumentStep.Equipment : DocumentStep.Location
        //             },
        //         });

        //         const newMaintenace = await tx.maintenance.create({
        //             data: {
        //                 natureOfBreakdown,
        //                 causes,
        //                 repairingStart: repairingStart ? dayjs(repairingStart).format() : null,
        //                 TOFstart: TOFstart ? dayjs(TOFstart).format() : null,
        //                 maintenanceRamark,
        //                 repairLocation,
        //                 maintenanceType,
        //                 documentId: newDocument.documentId
        //             },
        //         });

        //         return { newDocument, newMaintenace }

        //     });

        //     return new NextResponse(JSON.stringify({
        //         message: "Created Success",
        //         // documentIdNo: documentAndMaintenance.newDocument.documentIdNo,
        //         documentIdNo: documentCode,
        //         documentId: documentAndMaintenance.newDocument.documentId,
        //         maintenanceId: documentAndMaintenance.newMaintenace.maintenanceId
        //     }), { status: 201 });

        // } else {
            // Create a new document
 
            const { total, discountPrice, includeVat, vatPrice, withholdingTax, withholdingTaxPrice,totalAmountDue } = _footerForm
            const newDocument = await prisma.documentPaper.create({
                data: {
                    documentType: eDocumentType.Quotation, // fix frist 
                    documentIdNo: runningNumberStr,
                    docMonth: monthAbbr,
                    docType: "QT",
                    docYear: year,
                    documentDetials: null,
                    documentCreateDate: null,
                    documentExpire: null,
                    // documentType,
                    documentStatus: DocumentStatus.Draft,
                    total,
                    discountPrice,
                    includeVat,
                    vatPrice,
                    withholdingTax,
                    withholdingTaxPrice,
                    totalAmountDue
                },
            });


            const { companyName, taxId, branch, companyAddress, companyTel, contactorName, contactorTel, contactorAddress, contactorEmail } = _headForm

            const checkCompanyName = await prisma.customerCompany.findFirst({
                where: {
                    companyName
                }
            });

            let _companyId = null
            let _findCompantId = checkCompanyName?.customerCompanyId
            let _contactorId = null

            if(!_findCompantId){

            const newCustomer = await prisma.customerCompany.create({
                data: {
                    companyName,
                    companyTel,
                    taxId ,
                    branch ,
                    companyAddress,     
                },
            });

            _companyId = newCustomer.customerCompanyId

            }

            if(_companyId || _findCompantId){

            const newContactor = await prisma.contactor.create({
                data: {
                   customerCompanyId: _findCompantId ? _findCompantId : _companyId,
                   contactorName,
                   contactorTel,
                   contactorAddress,
                   contactorEmail
                },
            });
 
            }




            // return new NextResponse(JSON.stringify({
            //     message: "Created Success",
            //     // documentIdNo: newDocument.documentIdNo,
            //     documentIdNo: documentCode,
            //     documentId: newDocument.documentId
            // }),
            //     { status: 201 });

        // }

        return new NextResponse(JSON.stringify('asd'), { status: 201 });

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