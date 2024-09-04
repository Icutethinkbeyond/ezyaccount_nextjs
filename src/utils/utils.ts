import { Product } from "@/contexts/productServiceListContext";

// Function to calculate Tax
export const calculateTax = (totalPrice: number, vatRate: number, withholdingTaxPercent: number): { vatAmount: number; totalWithVAT: number; withholdingTaxAmount: number; totalAfterWithholdingTax: number } => {

    let vatAmount = 0;
    let totalWithVAT = totalPrice;

    // Calculate VAT if vatRate is greater than 0
    if (vatRate > 0) {
        vatAmount = totalPrice * vatRate;
        totalWithVAT = totalPrice + vatAmount;
    }

    let withholdingTaxAmount = 0;
    let totalAfterWithholdingTax = totalWithVAT;

    // Calculate Withholding Tax if withholdingTaxPercent is greater than 0
    if (withholdingTaxPercent > 0) {
        withholdingTaxAmount = totalWithVAT * (withholdingTaxPercent / 100);
        totalAfterWithholdingTax = totalWithVAT - withholdingTaxAmount;
    }

    return {
        vatAmount,
        totalWithVAT,
        withholdingTaxAmount,
        totalAfterWithholdingTax,
    };
}

export const calculateFooterTotals = (products: Product[]): { totalPrice: number; totalDiscount: number; priceAfterDiscount: number } => {

    // คำนวณผลรวมสำหรับ product
    let totalPrice: number = 0;
    let totalDiscount: number = 0;

    products.map((product) => {
        totalPrice += product.totalPrice;
        totalDiscount += product.totalDiscount;
    });

    let priceAfterDiscount = totalPrice - totalDiscount;

    return {
        totalPrice,
        totalDiscount,
        priceAfterDiscount
    }

};
