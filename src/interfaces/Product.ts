
export interface Category {
  categoryId: string;
  categoryName: string;
  categoryDesc?: string | null;
  products?: Product[];
  _count?: {
    products?: number
  }
}

export interface AboutProduct {
  aboutProductId: string;
  productId: string;
  productPrice: number;
  productDiscountPrice: number | null;
  productStock: number;
  productBrand: string | null;
  unitName: string | null;
}

export interface Product {
  productId: string;
  productName: string;
  productSKU: string | null;
  productDescription: string | null;
  productImage: string | null;
  aboutProduct?: AboutProduct | null;
  category?: Category | null;
  categoryId: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const initialCategory: Category = {
  categoryId: '',
  categoryName: '',
  categoryDesc: '',
  products: [],
};


export const initialAboutProduct: AboutProduct = {
  aboutProductId: "",
  productId: "",
  productPrice: 0,
  productDiscountPrice: 0,
  productStock: 0,
  productBrand: "",
  unitName: '',
}

export const initialProduct: Product = {
  productId: "",
  productName: "",
  productSKU: "",
  productDescription: "",
  productImage: "",
  aboutProduct: initialAboutProduct,
  category: initialCategory,
  categoryId: "",
}


export type CategorySelect = {
  categoryId: string; // ID ของหมวดหมู่
  categoryName: string; // ชื่อของหมวดหมู่
};
export type ProductSelect = {
  productId: string; // ID ของสินค้า
  productName: string; // ชื่อของสินค้า
};
