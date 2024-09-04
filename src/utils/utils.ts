import { Product } from "@/contexts/productServiceListContext";

// Function to calculate VAT (7%)
export const calculateVAT = (totalAmount: number): { vatAmount: number; totalWithVAT: number } => {
    const vatRate = 0.07; // 7% VAT
    const vatAmount = totalAmount * vatRate;
    const totalWithVAT = totalAmount + vatAmount;

    return {
        vatAmount,
        totalWithVAT,
    };
};

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
