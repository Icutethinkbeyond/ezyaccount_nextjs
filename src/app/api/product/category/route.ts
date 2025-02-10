import { NextRequest, NextResponse } from 'next/server';
import { Category, PrismaClient } from '@prisma/client';
import ProductService, { Pagination } from '@/services/database/ProductServices';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    try {

        // ดึง query parameters เช่น categoryId
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId');
        const page = searchParams.get('page');
        const pageSize = searchParams.get('pageSize');

        let categories;
        let productService = new ProductService()

        if (categoryId) {
            // ค้นหา category ตาม ID

            categories = await productService.getCategoryById(categoryId)

            if (!categories) {
                return new NextResponse(JSON.stringify('Category not found'), { status: 404 });
            }

            return new NextResponse(JSON.stringify(categories), { status: 200 });

        } else {

            let data: Pagination = await productService.getCategoryPagination(page, pageSize)

            return new NextResponse(
                JSON.stringify(data),
                { status: 200 }
            );
        }

        // return new NextResponse(JSON.stringify(categories), { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function POST(req: NextRequest) {

    try {

        const category = await req.json() as Category;
        const { categoryName, categoryDesc } = category

        let productService = new ProductService()

        // Validation
        if (!categoryName) {
            return new NextResponse(JSON.stringify('Category name is required'), { status: 400 });
        }

        //check name is exist
        const nameIsAlready = await prisma.category.findFirst({ where: { categoryName: { equals: categoryName } } })

        if (nameIsAlready) {
            return new NextResponse(JSON.stringify('Category name is Already'), { status: 400 });
        }

        // Create a new category
        const newCategory = await productService.createCategory({ categoryName, categoryDesc })

        return new NextResponse(JSON.stringify(newCategory), { status: 201 });

    } catch (error) {

        console.error("Error Connect Local Server:", error);
        return new NextResponse(JSON.stringify({ error }), { status: 500 });

    }

};

export async function DELETE(req: NextRequest) {

    try {
        // รับ categoryId จาก query parameter
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId');
        let productService = new ProductService();

        // ตรวจสอบว่ามี categoryId หรือไม่
        if (!categoryId) {
            return new NextResponse(JSON.stringify('Category ID is required'), { status: 400 });
        }

        // ลบ category โดยใช้ categoryId
        const deletedCategory = await productService.deleteCategory(categoryId)

        // ส่งข้อมูล category ที่ถูกลบกลับ
        return new NextResponse(JSON.stringify(deletedCategory), { status: 200 });
    } catch (error: any) {
        console.error('Error deleting category:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {

    try {

        const category = await req.json() as Category;
        const { categoryName, categoryDesc, categoryId } = category

        let productService = new ProductService()

        // Validation
        if (!categoryName) {
            return new NextResponse(JSON.stringify('Category name is required'), { status: 400 });
        }

        //check name is exist
        const nameIsAlready = await prisma.category.findFirst({ where: { categoryName: { equals: categoryName } } })

        if (nameIsAlready) {
            if (nameIsAlready?.categoryId !== categoryId) {
                return new NextResponse(JSON.stringify('Category name is Already'), { status: 400 });
            }
        }

        // Create a new category
        const updateCategory = await productService.updateCategory(categoryId, { categoryName, categoryDesc })

        return new NextResponse(JSON.stringify(updateCategory), { status: 201 });

    } catch (error: any) {

        console.error('Error updating category:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}