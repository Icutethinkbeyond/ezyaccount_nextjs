import { PrismaClient, Product, AboutProduct } from "@prisma/client";

const prisma = new PrismaClient();

class PrismaService {
  // 📌 ดึงข้อมูลสินค้า (พร้อม category และ aboutEquipment)
  async getProducts(): Promise<Product[]> {
    return await prisma.product.findMany({
      include: {
        category: true,
        aboutEquipment: true,
      },
    });
  }

  // 📌 ดึงข้อมูลสินค้าตาม ID
  async getProductById(equipmentId: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { equipmentId },
      include: {
        category: true,
        aboutEquipment: true,
      },
    });
  }

  // 📌 เพิ่มสินค้าใหม่
  async createProduct(data: Omit<Product, "equipmentId" | "createdAt" | "updatedAt">): Promise<Product> {
    return await prisma.product.create({
      data,
    });
  }

  // 📌 อัปเดตข้อมูลสินค้า
  async updateProduct(equipmentId: string, data: Partial<Product>): Promise<Product> {
    return await prisma.product.update({
      where: { equipmentId },
      data,
    });
  }

  // 📌 ลบสินค้า
  async deleteProduct(equipmentId: string): Promise<Product> {
    return await prisma.product.delete({
      where: { equipmentId },
    });
  }

  // 📌 ดึงข้อมูล AboutProduct ตาม equipmentId
  async getAboutProduct(equipmentId: string): Promise<AboutProduct | null> {
    return await prisma.aboutProduct.findUnique({
      where: { equipmentId },
    });
  }

  // 📌 อัปเดตข้อมูล AboutProduct
  async updateAboutProduct(
    equipmentId: string,
    data: Partial<AboutProduct>
  ): Promise<AboutProduct> {
    return await prisma.aboutProduct.update({
      where: { equipmentId },
      data,
    });
  }
}

export default new PrismaService();
