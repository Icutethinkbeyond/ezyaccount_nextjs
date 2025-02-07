// contexts/CategoryContext.tsx

"use client";

import {
  Category,
  initialCategory,
  CategorySelect,
} from "@/interfaces/Product";
import { faker } from "@faker-js/faker";
import { Dayjs } from "dayjs";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

// กำหนดประเภทของ Context
interface ProductContextProps {
  categoryState: Category[];
  setCategoryState: Dispatch<React.SetStateAction<Category[]>>;
  categoryForm: Category;
  setCategoryForm: Dispatch<React.SetStateAction<Category>>;
  categoryEdit: boolean;
  setCategoryEdit: Dispatch<React.SetStateAction<boolean>>;
  setCategorySelectState: Dispatch<React.SetStateAction<CategorySelect[]>>;
  categorySelectState: CategorySelect[];
  setTypeEdit: Dispatch<React.SetStateAction<boolean>>;
  typeEdit: boolean;
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
  const [categoryEdit, setCategoryEdit] = useState<boolean>(false);
  const [typeEdit, setTypeEdit] = useState<boolean>(false);

  useEffect(() => {
    // setCategoryForm({
    //   ...categoryForm,
    //   categoryId: "",
    //   categoryName: faker.company.name(),
    //   categoryDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
    // setTypeForm({
    //   ...typeForm,
    //   equipmentTypeId: "",
    //   equipmentTypeName: faker.finance.currencyCode(),
    //   equipmentTypeDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        categoryState,
        setCategoryState,
        categoryForm,
        setCategoryForm,
        categoryEdit,
        setCategoryEdit,
        typeEdit,
        setTypeEdit,
        categorySelectState,
        setCategorySelectState,
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
