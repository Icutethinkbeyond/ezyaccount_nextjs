// contexts/CategoryContext.tsx

"use client";

import {
  Category,
  initialCategory,
  CategorySelect,
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

// กำหนดประเภทของ Context
interface ProductContextProps {
  categoryState: Category[];
  setCategoryState: Dispatch<React.SetStateAction<Category[]>>;
  categoryForm: Category;
  setCategoryForm: Dispatch<React.SetStateAction<Category>>;
  setCategorySelectState: Dispatch<React.SetStateAction<CategorySelect[]>>;
  categorySelectState: CategorySelect[];
  paginationModel: GridPaginationModel;
  setPaginationModel: Dispatch<React.SetStateAction<GridPaginationModel>>;
  rowCount: number;
  setRowCount: Dispatch<React.SetStateAction<number>>;
  searchForm: SearchFormData;
  setSearchForm: Dispatch<React.SetStateAction<SearchFormData>>;
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
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [searchForm, setSearchForm] = useState<SearchFormData>({
    categoryName: "",
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
