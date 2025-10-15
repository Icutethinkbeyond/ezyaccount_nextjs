import { PrismaClient, Product, AboutProduct, Category, DocumentPaper } from "@prisma/client";

const prisma = new PrismaClient();

export interface Pagination {
  data: {
    rowIndex: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    categoryName: string;
    categoryDesc: string | null;
  }[],
  pagination: {
    page: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
  }
}

class DocumentServices {
  // 📌 ดึงข้อมูลสินค้า (พร้อม category และ aboutProduct)
  // async getProducts(): Promise<Product[]> {
  //   return await prisma.product.findMany({
  //     include: {
  //       category: true,
  //       aboutProduct: true,
  //     },
  //   });
  // }

  // 📌 ดึงข้อมูลสินค้าตาม ID
  // async getProductById(productId: string): Promise<Product | null> {
  //   return await prisma.product.findUnique({
  //     where: { productId },
  //     include: {
  //       category: true,
  //       aboutProduct: true,
  //     },
  //   });
  // }

  // 📌 เพิ่มสินค้าใหม่
  async createDocument(data: Omit<DocumentPaper, "documentId" | "createdAt" | "updatedAt">): Promise<DocumentPaper> {
    return await prisma.documentPaper.create({
      data,
    });
  }

  // 📌 อัปเดตข้อมูลสินค้า
  // async updateProduct(productId: string, data: Partial<Product>): Promise<Product> {
  //   return await prisma.product.update({
  //     where: { productId },
  //     data,
  //   });
  // }

  // 📌 ลบสินค้า
  // async deleteProduct(productId: string): Promise<Product> {
  //   return await prisma.product.delete({
  //     where: { productId },
  //   });
  // }

  // 📌 ดึงข้อมูล AboutProduct ตาม productId
  // async getAboutProduct(productId: string): Promise<AboutProduct | null> {
  //   return await prisma.aboutProduct.findUnique({
  //     where: { productId },
  //   });
  // }

  // 📌 อัปเดตข้อมูล AboutProduct
  // async updateAboutProduct(
  //   productId: string,
  //   data: Partial<AboutProduct>
  // ): Promise<AboutProduct> {
  //   return await prisma.aboutProduct.update({
  //     where: { productId },
  //     data,
  //   });
  // }

  // async getCategoryById(categoryId: string): Promise<Category | null> {
  //   return await prisma.category.findUnique({
  //     where: { categoryId },
  //     // include: {
  //     //   category: true,
  //     //   aboutProduct: true,
  //     // },
  //   });
  // }

  // async deleteCategory(categoryId: string): Promise<Category> {
    
  //   return await prisma.category.delete({
  //     where: { categoryId },
  //   });
  // }


  // async getCategoryPagination(pageParam: null | string, pageSizeParam: null | string, categoryName?: string | null): Promise<Pagination> {

  //   const page = parseInt(pageParam || '1', 10); // หน้าเริ่มต้นที่ 1
  //   const pageSize = parseInt(pageSizeParam || '10', 10); // จำนวนข้อมูลต่อหน้าเริ่มต้นที่ 10

  //   // คำนวณ skip และ take
  //   const skip = (page - 1) * pageSize;
  //   const take = pageSize;

  //   const [categories, totalItems] = await Promise.all([
  //     prisma.category.findMany({
  //       skip,
  //       take,
  //       orderBy: { createdAt: 'desc' }, // เรียงลำดับตามวันที่สร้าง
  //       where: {
  //         ...(categoryName && { categoryName: { contains: categoryName, mode: "insensitive" } }),
  //       }
  //     }),
  //     prisma.category.count(), // นับจำนวนทั้งหมดของรายการ
  //   ]);

  //   const totalPages = Math.ceil(totalItems / pageSize);

  //   // เพิ่ม rowIndex ในข้อมูลแต่ละแถว
  //   const categoriesWithIndex = categories.map((category, index) => ({
  //     ...category,
  //     rowIndex: skip + index + 1, // ลำดับแถวเริ่มต้นจาก 1 และเพิ่มตาม pagination
  //   }));

  //   return {
  //     data: categoriesWithIndex,
  //     pagination: {
  //       page,
  //       pageSize,
  //       totalItems,
  //       totalPages,
  //     },
  //   }
  // }

  // async createCategory(data: Omit<Category, "categoryId" | "createdAt" | "updatedAt" | "products">): Promise<Category> {
  //   return await prisma.category.create({
  //     data,
  //   });
  // }

  // async updateCategory(categoryId: string, data: Partial<Category>): Promise<Category> {
  //   return await prisma.category.update({
  //     where: { categoryId },
  //     data,
  //   });
  // }


}

export default DocumentServices;
