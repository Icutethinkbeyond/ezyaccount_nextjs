import { NextRequest, NextResponse } from 'next/server';
import ProductService, { Pagination } from '@/services/database/ProductServices';

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {

    try {
        
        // ดึง query parameters เช่น categoryId
        const { searchParams } = new URL(req.url);
        let categoryName = searchParams.get('categoryName');
        const page = searchParams.get('page');
        const pageSize = searchParams.get('pageSize');
        let productService = new ProductService()

        let data: Pagination = await productService.getCategoryPagination(page, pageSize, categoryName)

        return new NextResponse(
            JSON.stringify(data),
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching categories:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
