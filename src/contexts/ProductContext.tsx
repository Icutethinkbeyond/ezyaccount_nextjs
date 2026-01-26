// contexts/CategoryContext.tsx

"use client";

import {
  Category,
  initialCategory,
  CategorySelect,
  Product,
  initialProduct,
  ProductSelect
} from "@/interfaces/Product";
import { faker } from "@faker-js/faker";
import { GridPaginationModel } from "@mui/x-data-grid";
import { Dayjs } from "dayjs";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

export interface SearchFormData {
  categoryName: string;
}
export interface SearchProductFormData {
  productId: string;
  categoryName: string;
  productName: string;
  productSKU: string;
  productStock: string;
  productBrand: string;
  productPrice: string;
  productDiscountPrice: string;
}

// กำหนดประเภทของ Context
interface ProductContextProps {
  categoryState: Category[];
  setCategoryState: Dispatch<React.SetStateAction<Category[]>>;
  categoryForm: Category;
  setCategoryForm: Dispatch<React.SetStateAction<Category>>;
  setCategorySelectState: Dispatch<React.SetStateAction<CategorySelect[]>>;
  categorySelectState: CategorySelect[];

  productState: Product[];
  setProductState: Dispatch<React.SetStateAction<Product[]>>;
  productForm: Product;
  setProductForm: Dispatch<React.SetStateAction<Product>>;
  setProductSelectState: Dispatch<React.SetStateAction<ProductSelect[]>>;
  productSelectState: ProductSelect[];
  paginationModel: GridPaginationModel;
  setPaginationModel: Dispatch<React.SetStateAction<GridPaginationModel>>;
  rowCount: number;
  setRowCount: Dispatch<React.SetStateAction<number>>;
  searchForm: SearchFormData;
  searchProductForm: SearchProductFormData;
  setSearchForm: Dispatch<React.SetStateAction<SearchFormData>>;
  setSearchProductForm: Dispatch<React.SetStateAction<SearchProductFormData>>;
}

// สร้าง Context
const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [categoryState, setCategoryState] = useState<Category[]>([]);
  const [categorySelectState, setCategorySelectState] = useState<
    CategorySelect[]
  >([]);
  const [categoryForm, setCategoryForm] = useState<Category>(initialCategory);
  
  const [productState, setProductState] = useState<Product[]>([]);
  const [productSelectState, setProductSelectState] = useState<
    ProductSelect[]
  >([]);
  const [productForm, setProductForm] = useState<Product>(initialProduct);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });


  const [searchForm, setSearchForm] = useState<SearchFormData>({
    categoryName: "",
  });

  const [searchProductForm, setSearchProductForm] = useState<SearchProductFormData>({
    productId: "",
    categoryName: "",
    productName: "",
    productSKU: "",
    productStock: "",
    productBrand: "",
    productPrice: "",
    productDiscountPrice: "",
  });

  return (
    <ProductContext.Provider
      value={{
        searchForm,
        setSearchForm,
        setRowCount,
        rowCount,
        categoryState,
        setCategoryState,
        categoryForm,
        setCategoryForm,
        categorySelectState,
        setCategorySelectState,
        searchProductForm,
        setSearchProductForm,
        productState,
        setProductState,
        productForm,
        setProductForm,
        productSelectState,
        setProductSelectState,
        setPaginationModel,
        paginationModel,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
