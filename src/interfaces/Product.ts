
export interface Category {
  categoryId: string;
  categoryName: string;
  categoryDesc?: string | null;
  products: Product[];
  _count?: {
    equipments: number
  }
}

export interface AboutProduct {
  aboutProductId: string | null
  product: Product | null
  productId: string | null,
  productPrice: number
  productDiscountPrice: number
  productStock: number
  productBrand: string | null
  unitName: string
}

export interface Product {
  productId: string | null,
  productName: string,
  productSKU: string | null,
  productDescription: string | null,
  aboutProduct: AboutProduct,
  productImage: string | null,
  category: Category
  categoryId: string | null
}

export const initialCategory: Category = {
  categoryId: '',
  categoryName: '',
  categoryDesc: '',
  products: [],
};


export const initialAboutProduct: AboutProduct = {
  aboutProductId: "",
  product: null,
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
