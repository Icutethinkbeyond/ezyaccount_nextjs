"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Define input types based on what we see in the contexts
interface QuotationInput {
    // Header Info
    companyName: string;
    companyTel: string;
    taxId: string;
    branch: string;
    dateCreate: string; // ISO Date string or similar
    companyAddress: string;

    contactorName: string;
    contactorTel: string;
    contactorEmail: string;
    contactorAddress: string;

    // Footer/Calculation Info
    includeVat: boolean;
    taxRate: number;
    globalDiscount: number; // discount
    withholdingTax: number;

    // Items
    categories: {
        id: string; // might be temp id like 'cat-123'
        name: string;
        subItems: {
            id: string; // might be temp id
            description: string;
            unit: string;
            qty: number;
            pricePerUnit: number;
            remark: string;
        }[];
    }[];
}

export async function createQuotation(data: QuotationInput) {
    try {
        console.log("Creating quotation with data:", JSON.stringify(data, null, 2));

        // Calculate summaries serverside for safety (though currently UI passes them implicitly mostly)
        // We will recalculate totals to be sure
        let subTotal = 0;
        data.categories.forEach(cat => {
            cat.subItems.forEach(item => {
                subTotal += (item.qty || 0) * (item.pricePerUnit || 0);
            });
        });

        const totalAfterDiscount = subTotal - (data.globalDiscount || 0);
        const vatAmount = data.includeVat ? (totalAfterDiscount * (data.taxRate || 7) / 100) : 0;
        const grandTotal = totalAfterDiscount + vatAmount; // withholding tax usually deducted from payment, not grand total of invoice usually, but let's store it if needed

        // Generate a Document ID (Simple timestamp based or UUID)
        const docIdNo = `QT-${Date.now()}`;

        // 1. Find or Create Company Profile (User's company - wait, the form implies `companyName` is OUR company? 
        // Or is it the Customer's? 
        // Looking at CompanyInformation form, it asks for "Company Name", "Tax ID". 
        // Usually "Company Information" in a Quotation form refers to the CUSTOMER. 
        // BUT Schema has `CompanyProfile` (us) and `CustomerCompany` (them).
        // Let's assume the input form `CompanyInformation` refers to the CUSTOMER COMPANY because `ContactorInformation` is next to it.
        // However, usually "Company Information" might be "My Company".
        // Let's re-read the UI fields... "ชื่อบริษัท", "เลขที่เสียภาษี". 
        // In `schema.prisma`, `DocumentPaper` connects to `CustomerCompany`.
        // So let's create a `CustomerCompany` record.

        // Create Customer Company
        const customer = await prisma.customerCompany.create({
            data: {
                companyName: data.companyName,
                taxId: data.taxId,
                companyTel: data.companyTel,
                branch: data.branch,
                companyAddress: data.companyAddress,
            }
        });

        // Create Contactor
        const contactor = await prisma.contactor.create({
            data: {
                contactorName: data.contactorName,
                contactorTel: data.contactorTel,
                contactorEmail: data.contactorEmail,
                contactorAddress: data.contactorAddress,
                customerCompanyId: customer.customerCompanyId,
            }
        });

        // Create DocumentPaper
        const document = await prisma.documentPaper.create({
            data: {
                documentIdNo: docIdNo,
                docType: "Quotation",
                documentDetials: "Generated from Web Form", // Fixed typo in schema if you fix it later, but using schema field name
                customerCompanyId: customer.customerCompanyId,
                contactorId: contactor.contactorId,

                includeVat: data.includeVat,
                taxRate: data.taxRate || 7,
                globalDiscount: data.globalDiscount,

                subTotal: subTotal,
                totalAfterDiscount: totalAfterDiscount,
                vatAmount: vatAmount,
                grandTotal: grandTotal,
                withholdingTax: data.withholdingTax,

                // Items
                categories: {
                    create: data.categories.map((cat, index) => ({
                        name: cat.name,
                        orderIndex: index,
                        items: {
                            create: cat.subItems.map((item, iIndex) => ({
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
            }
        });

        revalidatePath("/protected/income/quotation");
        return { success: true, documentId: document.documentId };

    } catch (error) {
        console.error("Error creating quotation:", error);
        return { success: false, error: String(error) };
    }
}

export async function getQuotations() {
    try {
        const docs = await prisma.documentPaper.findMany({
            where: {
                docType: "Quotation" // or match enum if you use it, schema says field is string but enum default exists
            },
            include: {
                customerCompany: true,
                contactor: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Map to the format expected by the table if needed, or just return docs
        // The table previously used `headForm` prop structure, we might need to adapt.
        return docs;
    } catch (error) {
        console.error("Error fetching quotations:", error);
        return [];
    }
}
