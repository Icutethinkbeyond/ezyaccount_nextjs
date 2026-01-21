"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

export interface SubItem {
  id: string
  description: string
  unit: string
  qty: number
  pricePerUnit: number
  remark: string
}

export interface Category {
  id: string
  name: string
  subItems: SubItem[]
}

interface PricingContextType {
  categories: Category[]
  addCategory: (name: string) => void
  removeCategory: (categoryId: string) => void
  updateCategoryName: (categoryId: string, name: string) => void
  addSubItem: (categoryId: string, subItem: Omit<SubItem, "id">) => void
  removeSubItem: (categoryId: string, subItemId: string) => void
  updateSubItem: (categoryId: string, subItemId: string, subItem: Partial<SubItem>) => void
  getTotalPrice: () => number
  getCategoryTotal: (categoryId: string) => number
  discount: number
  taxRate: number
  vatIncluded: boolean
  setDiscount: (discount: number) => void
  setTaxRate: (taxRate: number) => void
  setVatIncluded: (vatIncluded: boolean) => void
  getSubtotal: () => number
  getTotalAfterDiscount: () => number
  getTaxAmount: () => number
  getGrandTotal: () => number
  loadData: (categories: Category[], discount: number, vatIncluded: boolean) => void
}

const PricingContext = createContext<PricingContextType | undefined>(undefined)

export const usePricingContext = () => {
  const context = useContext(PricingContext)
  if (!context) {
    throw new Error("usePricing must be used within PricingProvider")
  }
  return context
}

interface PricingProviderProps {
  children: ReactNode
}

export const interiorDesignMockupData: Category[] = [
  // ----------------------------------------------------
  // 1. หมวดหมู่: ค่าบริการออกแบบ
  // ----------------------------------------------------
  {
    id: "CAT001",
    name: "ค่าบริการออกแบบ (Design Fee)",
    subItems: [
      {
        id: "ITEM001",
        description: "ค่าออกแบบและเขียนแบบ 3D Perspective (พื้นที่ 60 ตร.ม.)",
        unit: "ตร.ม.",
        qty: 60,
        pricePerUnit: 800, // 800 บาท/ตร.ม.
        remark: "รวมค่าขึ้นแบบ 3D และแบบก่อสร้าง",
      },
      {
        id: "ITEM002",
        description: "ค่าที่ปรึกษาและประสานงานโครงการ",
        unit: "โครงการ",
        qty: 1,
        pricePerUnit: 15000,
        remark: "ครอบคลุมระยะเวลา 3 เดือน",
      },
    ],
  },

  // ----------------------------------------------------
  // 2. หมวดหมู่: งานโครงสร้างและงานผนังเบา
  // ----------------------------------------------------
  {
    id: "CAT002",
    name: "งานโครงสร้าง งานพื้น และงานผนัง",
    subItems: [
      {
        id: "ITEM003",
        description: "งานรื้อถอนผนังเดิมและขนเศษวัสดุ",
        unit: "จุด",
        qty: 2,
        pricePerUnit: 3500,
        remark: "ผนังอิฐมอญ 2 จุด",
      },
      {
        id: "ITEM004",
        description: "ติดตั้งผนังเบา (Drywall) กั้นห้องใหม่",
        unit: "ตร.ม.",
        qty: 15,
        pricePerUnit: 950,
        remark: "ผนังเบามาตรฐานพร้อมฉนวนกันเสียง",
      },
      {
        id: "ITEM005",
        description: "ปูกระเบื้องพื้นห้องน้ำใหม่",
        unit: "ตร.ม.",
        qty: 5,
        pricePerUnit: 1200,
        remark: "รวมค่ายาแนวและกาวซีเมนต์",
      },
    ],
  },

  // ----------------------------------------------------
  // 3. หมวดหมู่: งานเฟอร์นิเจอร์บิวท์อิน
  // ----------------------------------------------------
  {
    id: "CAT003",
    name: "งานเฟอร์นิเจอร์บิวท์อิน",
    subItems: [
      {
        id: "ITEM006",
        description: "ตู้เสื้อผ้าบิวท์อิน (หน้าบานไม้ MDF พ่นสี)",
        unit: "เมตร",
        qty: 3.5,
        pricePerUnit: 18000,
        remark: "ความสูง 2.5 ม., รวมรางลิ้นชัก Soft Close",
      },
      {
        id: "ITEM007",
        description: "เคาน์เตอร์ครัวปูน (โครงสร้างเบา)",
        unit: "เมตร",
        qty: 4,
        pricePerUnit: 12500,
        remark: "ไม่รวม Top เคาน์เตอร์หิน",
      },
    ],
  },

  // ----------------------------------------------------
  // 4. หมวดหมู่: งานระบบไฟฟ้าและแสงสว่าง
  // ----------------------------------------------------
  {
    id: "CAT004",
    name: "งานระบบไฟฟ้าและแสงสว่าง",
    subItems: [
      {
        id: "ITEM008",
        description: "เพิ่มจุดติดตั้งสวิตช์และปลั๊กไฟ",
        unit: "จุด",
        qty: 12,
        pricePerUnit: 850,
        remark: "รวมสายไฟและบล็อกลอย/ฝังผนัง",
      },
      {
        id: "ITEM009",
        description: "ติดตั้งโคมไฟ Downlight LED",
        unit: "ชุด",
        qty: 10,
        pricePerUnit: 1200,
        remark: "โคมไฟขนาด 9W Warm White",
      },
    ],
  },
];

export const PricingProvider: React.FC<PricingProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [discount, setDiscount] = useState<number>(0)
  const [taxRate, setTaxRate] = useState<number>(7)
  const [vatIncluded, setVatIncluded] = useState<boolean>(false)


  useEffect(() => {
    console.log(categories)
  }, [categories])

  const addCategory = useCallback((name: string) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      subItems: [],
    }
    setCategories((prev) => [...prev, newCategory])
  }, [])

  const removeCategory = useCallback((categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
  }, [])

  const updateCategoryName = useCallback((categoryId: string, name: string) => {
    setCategories((prev) => prev.map((cat) => (cat.id === categoryId ? { ...cat, name } : cat)))
  }, [])

  const addSubItem = useCallback((categoryId: string, subItem: Omit<SubItem, "id">) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
            ...cat,
            subItems: [...cat.subItems, { ...subItem, id: `item-${Date.now()}` }],
          }
          : cat,
      ),
    )
  }, [])

  const removeSubItem = useCallback((categoryId: string, subItemId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
            ...cat,
            subItems: cat.subItems.filter((item) => item.id !== subItemId),
          }
          : cat,
      ),
    )
  }, [])

  const updateSubItem = useCallback((categoryId: string, subItemId: string, subItem: Partial<SubItem>) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
            ...cat,
            subItems: cat.subItems.map((item) => (item.id === subItemId ? { ...item, ...subItem } : item)),
          }
          : cat,
      ),
    )
  }, [])

  const getCategoryTotal = useCallback((categoryId: string): number => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return 0
    return category.subItems.reduce((sum, item) => sum + item.qty * item.pricePerUnit, 0)
  }, [categories])

  const getTotalPrice = useCallback(() => {
    return categories.reduce((sum, cat) => {
      const categoryTotal = cat.subItems.reduce((s, item) => s + (item.qty * item.pricePerUnit), 0)
      return sum + categoryTotal
    }, 0)
  }, [categories])

  const getSubtotal = useCallback(() => {
    return getTotalPrice()
  }, [getTotalPrice])

  const getTotalAfterDiscount = useCallback(() => {
    const subtotal = getSubtotal()
    return subtotal - discount
  }, [getSubtotal, discount])

  const getTaxAmount = useCallback(() => {
    const totalAfterDiscount = getTotalAfterDiscount()
    return vatIncluded ? (totalAfterDiscount * taxRate) / 100 : 0
  }, [getTotalAfterDiscount, vatIncluded, taxRate])

  const getGrandTotal = useCallback(() => {
    const totalAfterDiscount = getTotalAfterDiscount()
    const taxAmount = getTaxAmount()
    return totalAfterDiscount + taxAmount
  }, [getTotalAfterDiscount, getTaxAmount])

  const loadData = useCallback((categories: Category[], discount: number, vatIncluded: boolean) => {
    setCategories(categories)
    setDiscount(discount)
    setVatIncluded(vatIncluded)
  }, [])

  return (
    <PricingContext.Provider
      value={{
        categories,
        addCategory,
        removeCategory,
        updateCategoryName,
        addSubItem,
        removeSubItem,
        updateSubItem,
        getTotalPrice,
        getCategoryTotal,
        discount,
        taxRate,
        vatIncluded,
        setDiscount,
        setTaxRate,
        setVatIncluded,
        getSubtotal,
        getTotalAfterDiscount,
        getTaxAmount,
        getGrandTotal,
        loadData,
      }}
    >
      {children}
    </PricingContext.Provider>
  )
}
