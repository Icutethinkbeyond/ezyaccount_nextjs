// contexts/DatabaseContext.tsx
"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { FormDataFooter, HeadForm, Product } from "./productServiceListContext";

// กำหนดประเภทของสินค้าย่อย
export interface Quotation {
  keyId: number;
  ownerId: string | null;
  status: string;
  headForm: HeadForm | null;
  products: Product[] | null;
  summary: FormDataFooter | null;
  createDate: Date;
  updateDate: Date;
}

export const quotationClean = {
  keyId: 0,
  ownerId: null,
  status: "draft",
  headForm: null,
  products: null,
  summary: null,
  createDate: new Date(),
  updateDate: new Date()
};
// กำหนดประเภทของ Context
interface DatabaseContextProps {
  qoutationState: Quotation[];
  editQuotation: Quotation;
  setEditQuotation: React.Dispatch<React.SetStateAction<Quotation>>;
  addQuotation: (qoutation: Quotation) => void;
  removeQuotation: (keyId: number) => void;
  updateQuotation: (qoutation: Quotation) => void;
}

// สร้าง Context
const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined
);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const [qoutationState, setQuotation] = useState<Quotation[]>([
    {
      keyId: 8,
      ownerId: "1",
      status: "approve",
      headForm: {
        quotationNumber: "QT-2986",
        companyName: "KhangHai Fram",
        companyTel: "KhangHai Fram",
        contactorName: "thanapong chunchombun",
        contactorTel: "0876641405",
        companyAddress: "บ้านบวกครก ซอย 3 ตำบล หนองตอง\nหางดง",
        contactorAddress: "บ้านบวกครก ซอย 3 ตำบล หนองตอง\nหางดง",
        contactorEmail: "thanapognchunchombun@gmail.com",
        taxId: "1102002557010",
        branch: "Main",
        dateCreate: "2024-09-05",
        includeTax: false,
        note: "test",
      },
      products: [
        {
          isSubjectItem: true,
          productServiceNumber: 1,
          productService: "test product",
          description: "",
          price: 0,
          amount: 0,
          discount: 0,
          total: 0,
          subProductList: [
            {
              isSubjectItem: false,
              subProductServiceNumber: 1.1,
              productService: "test sub product 1.1",
              description: "",
              price: 20000,
              amount: 2,
              discount: 2000,
              total: 38000,
              productServiceKey: 1,
            },
          ],
          totalAmount: 2,
          totalPrice: 40000,
          totalDiscount: 2000,
          sumTotal: 38000,
          totalAmountDue: 36000,
        },
        {
          isSubjectItem: true,
          productServiceNumber: 2,
          productService: "test product 2",
          description: "",
          price: 0,
          amount: 0,
          discount: 0,
          total: 0,
          subProductList: [
            {
              isSubjectItem: false,
              subProductServiceNumber: 2.1,
              productService: "test sub product 2.1",
              description: "",
              price: 3000,
              amount: 4,
              discount: 0,
              total: 12000,
              productServiceKey: 2,
            },
            {
              isSubjectItem: false,
              subProductServiceNumber: 2.2,
              productService: "test sub product 2.2",
              description: "",
              price: 1000,
              amount: 2,
              discount: 100,
              total: 1900,
              productServiceKey: 2,
            },
          ],
          totalAmount: 6,
          totalPrice: 14000,
          totalDiscount: 100,
          sumTotal: 13900,
          totalAmountDue: 13800,
        },
        {
          isSubjectItem: true,
          productServiceNumber: 3,
          productService: "test product 3",
          description: "",
          price: 0,
          amount: 0,
          discount: 0,
          total: 0,
          subProductList: [
            {
              isSubjectItem: false,
              subProductServiceNumber: 3.1,
              productService: "test sub product 3.1",
              description: "",
              price: 999,
              amount: 5,
              discount: 0,
              total: 4995,
              productServiceKey: 3,
            },
          ],
          totalAmount: 5,
          totalPrice: 4995,
          totalDiscount: 0,
          sumTotal: 4995,
          totalAmountDue: 4995,
        },
      ],
      summary: {
        total: 58995,
        discountPrice: 2100,
        priceAfterDiscount: 56895,
        includeVat: true,
        vatPrice: 3982.6500000000005,
        totalAmount: 60877.65,
        withholdingTax: 4,
        withholdingTaxPrice: 2435.106,
        totalAmountDue: 58442.544,
      },
      createDate: new Date("2024-09-05T07:34:59.452Z"),
      updateDate: new Date("2024-09-05T07:34:59.452Z"),
    },
    {
      keyId: 9,
      ownerId: "1",
      status: "approve",
      headForm: {
        quotationNumber: "QT-9485",
        companyName: "KhangHai Fram",
        companyTel: "KhangHai Fram",
        contactorName: "thanapong chunchombun",
        contactorTel: "0876641405",
        companyAddress: "บ้านบวกครก ซอย 3 ตำบล หนองตอง\nหางดง",
        contactorAddress: "บ้านบวกครก ซอย 3 ตำบล หนองตอง\nหางดง",
        contactorEmail: "thanapognchunchombun@gmail.com",
        taxId: "1102002557010",
        branch: "Main",
        dateCreate: "2024-09-05",
        includeTax: false,
        note: "test",
      },
      products: [
        {
          isSubjectItem: true,
          productServiceNumber: 1,
          productService: "test product",
          description: "",
          price: 0,
          amount: 0,
          discount: 0,
          total: 0,
          subProductList: [
            {
              isSubjectItem: false,
              subProductServiceNumber: 1.1,
              productService: "test sub product 1.1",
              description: "",
              price: 20000,
              amount: 2,
              discount: 2000,
              total: 38000,
              productServiceKey: 1,
            },
          ],
          totalAmount: 2,
          totalPrice: 40000,
          totalDiscount: 2000,
          sumTotal: 38000,
          totalAmountDue: 36000,
        },
        {
          isSubjectItem: true,
          productServiceNumber: 2,
          productService: "test product 2",
          description: "",
          price: 0,
          amount: 0,
          discount: 0,
          total: 0,
          subProductList: [
            {
              isSubjectItem: false,
              subProductServiceNumber: 2.1,
              productService: "test sub product 2.1",
              description: "",
              price: 3000,
              amount: 4,
              discount: 0,
              total: 12000,
              productServiceKey: 2,
            },
            {
              isSubjectItem: false,
              subProductServiceNumber: 2.2,
              productService: "test sub product 2.2",
              description: "",
              price: 1000,
              amount: 2,
              discount: 100,
              total: 1900,
              productServiceKey: 2,
            },
          ],
          totalAmount: 6,
          totalPrice: 14000,
          totalDiscount: 100,
          sumTotal: 13900,
          totalAmountDue: 13800,
        },
        {
          isSubjectItem: true,
          productServiceNumber: 3,
          productService: "test product 3",
          description: "",
          price: 0,
          amount: 0,
          discount: 0,
          total: 0,
          subProductList: [
            {
              isSubjectItem: false,
              subProductServiceNumber: 3.1,
              productService: "test sub product 3.1",
              description: "",
              price: 999,
              amount: 5,
              discount: 0,
              total: 4995,
              productServiceKey: 3,
            },
          ],
          totalAmount: 5,
          totalPrice: 4995,
          totalDiscount: 0,
          sumTotal: 4995,
          totalAmountDue: 4995,
        },
      ],
      summary: {
        total: 58995,
        discountPrice: 2100,
        priceAfterDiscount: 56895,
        includeVat: true,
        vatPrice: 3982.6500000000005,
        totalAmount: 60877.65,
        withholdingTax: 4,
        withholdingTaxPrice: 2435.106,
        totalAmountDue: 58442.544,
      },
      createDate: new Date("2024-09-05T07:34:59.452Z"),
      updateDate: new Date("2024-09-05T07:34:59.452Z"),
    },
    {
      keyId: 3,
      ownerId: "1",
      status: "draft",
      headForm: {
        quotationNumber: "QT-7586",
        companyName: "KhangHai Fram",
        companyTel: "KhangHai Fram",
        contactorName: "Thanapong Chunchombun",
        contactorTel: "0876641405",
        companyAddress: "42 moo 2 nongtong sub-district",
        contactorAddress: "บ้านบวกครก ซอย 3 ตำบล หนองตอง\nหางดง",
        contactorEmail: "thanapognchunchombun@gmail.com",
        taxId: "1102002557010",
        branch: "Main",
        dateCreate: "",
        includeTax: false,
        note: "test"
      },
      products: [
        {
          isSubjectItem: true,
          productServiceNumber: 1,
          productService: "adasdasdadasd",
          description: "",
          price: 0,
          amount: 0,
          discount: 0,
          total: 0,
          subProductList: [
            {
              isSubjectItem: false,
              subProductServiceNumber: 1,
              productService: "asdasdasdasd",
              description: "",
              price: 2000,
              amount: 2,
              discount: 0,
              total: 4000,
              productServiceKey: 1
            }
          ],
          totalAmount: 2,
          totalPrice: 4000,
          totalDiscount: 0,
          sumTotal: 4000,
          totalAmountDue: 4000
        },
        {
          isSubjectItem: true,
          productServiceNumber: 2,
          productService: "asdasdasd",
          description: "",
          price: 0,
          amount: 0,
          discount: 0,
          total: 0,
          subProductList: [
            {
              isSubjectItem: false,
              subProductServiceNumber: 1.2,
              productService: "asdadasdasd",
              description: "",
              price: 3000,
              amount: 11,
              discount: 0,
              total: 33000,
              productServiceKey: 2
            }
          ],
          totalAmount: 11,
          totalPrice: 33000,
          totalDiscount: 0,
          sumTotal: 33000,
          totalAmountDue: 33000
        },
        {
          isSubjectItem: true,
          productServiceNumber: 3,
          productService: "asdasdasdasd",
          description: "",
          price: 0,
          amount: 0,
          discount: 0,
          total: 0,
          subProductList: [
            {
              isSubjectItem: false,
              subProductServiceNumber: 3.1,
              productService: "sdfsdfsdfsdf",
              description: "",
              price: 2000,
              amount: 5,
              discount: 1000,
              total: 9000,
              productServiceKey: 3
            }
          ],
          totalAmount: 5,
          totalPrice: 10000,
          totalDiscount: 1000,
          sumTotal: 9000,
          totalAmountDue: 8000
        }
      ],
      summary: {
        total: 47000,
        discountPrice: 1000,
        priceAfterDiscount: 46000,
        includeVat: true,
        vatPrice: 3220.0000000000005,
        totalAmount: 49220,
        withholdingTax: 6,
        withholdingTaxPrice: 2953.2,
        totalAmountDue: 46266.8
      },
      createDate: new Date("2024-09-05T08:01:43.342Z"),
      updateDate: new Date("2024-09-05T08:01:43.342Z")
    }
  ]);

  const [editQuotation, setEditQuotation] = useState<Quotation>(quotationClean);

  // ฟังก์ชันสำหรับเพิ่มสินค้า
  const addQuotation = (quotation: Quotation) => {
    setQuotation((prevQuotation) => [...prevQuotation, quotation]);
  };

  // ฟังก์ชันสำหรับลบสินค้า
  const removeQuotation = (keyId: number) => {
    setQuotation((prevQuotation) =>
      prevQuotation.filter(
        (quotation) => quotation.keyId !== keyId
      )
    );
  };

  // ฟังก์ชันสำหรับอัปเดตสินค้า
  const updateQuotation = (updateQuotation: Quotation) => {
    setQuotation((prevQuotation) =>
      prevQuotation.map((quotation) =>
        quotation.keyId === updateQuotation.keyId
          ? updateQuotation
          : quotation
      )
    );
  };

  return (
    <DatabaseContext.Provider
      value={{
        editQuotation,
        setEditQuotation,
        qoutationState,
        addQuotation,
        removeQuotation,
        updateQuotation,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error(
      "useDatabaseContext must be used within a ProductsProvider"
    );
  }
  return context;
};
