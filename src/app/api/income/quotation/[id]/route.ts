import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface QuotationInput {
    companyName: string;
    companyTel: string;
    taxId: string;
    branch: string;
    dateCreate: string;
    companyAddress: string;

    contactorName: string;
    contactorTel: string;
    contactorEmail: string;
    contactorAddress: string;

    includeVat: boolean;
    taxRate: number;
    globalDiscount: number;
    withholdingTax: number;
    note?: string;

    categories: {
        id: string;
        name: string;
        subItems: {
            id: string;
            name: string;
            description: string;
            unit: string;
            qty: number;
            pricePerUnit: number;
            remark: string;
        }[];
    }[];
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const documentId = params.id;

        const quotation = await prisma.documentPaper.findUnique({
            where: {
                documentId: documentId
            },
            include: {
                customerCompany: true,
                contactor: true,
                categories: {
                    include: {
                        items: {
                            orderBy: {
                                orderIndex: 'asc'
                            }
                        }
                    },
                    orderBy: {
                        orderIndex: 'asc'
                    }
                }
            }
        });

        if (!quotation) {
            return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
        }

        return NextResponse.json(quotation);
    } catch (error) {
        console.error("Error fetching quotation:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const documentId = params.id;
        const data: QuotationInput = await req.json();

        console.log("Updating quotation with data:", JSON.stringify(data, null, 2));

        let subTotal = 0;
        data.categories.forEach(cat => {
            cat.subItems.forEach(item => {
                subTotal += (item.qty || 0) * (item.pricePerUnit || 0);
            });
        });

        const totalAfterDiscount = subTotal - (data.globalDiscount || 0);
        const vatAmount = data.includeVat ? (totalAfterDiscount * (data.taxRate || 7) / 100) : 0;
        const grandTotal = totalAfterDiscount + vatAmount;

        const existingQuotation = await prisma.documentPaper.findUnique({
            where: { documentId },
            include: {
                customerCompany: true,
                contactor: true,
                categories: {
                    include: {
                        items: true
                    }
                }
            }
        });

        if (!existingQuotation) {
            return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
        }

        if (!existingQuotation.customerCompanyId) {
            return NextResponse.json({ error: 'Invalid quotation data' }, { status: 400 });
        }

        await prisma.customerCompany.update({
            where: { customerCompanyId: existingQuotation.customerCompanyId },
            data: {
                companyName: data.companyName,
                taxId: data.taxId,
                companyTel: data.companyTel,
                branch: data.branch,
                companyAddress: data.companyAddress,
            }
        });

        if (!existingQuotation.contactorId) {
            return NextResponse.json({ error: 'Invalid quotation data' }, { status: 400 });
        }

        await prisma.contactor.update({
            where: { contactorId: existingQuotation.contactorId },
            data: {
                contactorName: data.contactorName,
                contactorTel: data.contactorTel,
                contactorEmail: data.contactorEmail,
                contactorAddress: data.contactorAddress,
            }
        });

        await prisma.documentCategory.deleteMany({
            where: { documentPaperId: documentId }
        });

        const updatedDocument = await prisma.documentPaper.update({
            where: { documentId },
            data: {
                includeVat: data.includeVat,
                taxRate: data.taxRate || 7,
                globalDiscount: data.globalDiscount,

                subTotal: subTotal,
                totalAfterDiscount: totalAfterDiscount,
                vatAmount: vatAmount,
                grandTotal: grandTotal,
                withholdingTax: data.withholdingTax,
                note: data.note || null,

                categories: {
                    create: data.categories.map((cat, index) => ({
                        name: cat.name,
                        orderIndex: index,
                        items: {
                            create: cat.subItems.map((item, iIndex) => ({
                                name: item.name,
                                description: item.description,
                                unit: item.unit,
                                qty: item.qty,
                                pricePerUnit: item.pricePerUnit,
                                remark: item.remark,
                                totalPrice: (item.qty * item.pricePerUnit),
                                orderIndex: iIndex
                            }))
                        }
                    }))
                }
            },
            include: {
                customerCompany: true,
                contactor: true,
                categories: {
                    include: {
                        items: true
                    }
                }
            }
        });

        return NextResponse.json({ success: true, document: updatedDocument });

    } catch (error) {
        console.error("Error updating quotation:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const documentId = params.id;
        const { searchParams } = new URL(req.url);
        const permanent = searchParams.get('permanent') === 'true';

        if (permanent) {
            await prisma.documentPaper.delete({
                where: { documentId }
            });
            return NextResponse.json({ success: true, message: 'Deleted permanently' });
        } else {
            await prisma.documentPaper.update({
                where: { documentId },
                data: {
                    isDeleted: true,
                    deletedAt: new Date()
                }
            });
            return NextResponse.json({ success: true, message: 'Moved to trash' });
        }
    } catch (error) {
        console.error("Error deleting quotation:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const documentId = params.id;
        // Restore from trash
        await prisma.documentPaper.update({
            where: { documentId },
            data: {
                isDeleted: false,
                deletedAt: null
            }
        });
        return NextResponse.json({ success: true, message: 'Restored from trash' });
    } catch (error) {
        console.error("Error restoring quotation:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
