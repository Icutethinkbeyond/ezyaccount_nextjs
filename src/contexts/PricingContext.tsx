"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

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

export const PricingProvider: React.FC<PricingProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [discount, setDiscount] = useState<number>(0)
  const [taxRate, setTaxRate] = useState<number>(7)
  const [vatIncluded, setVatIncluded] = useState<boolean>(false)

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      subItems: [],
    }
    setCategories([...categories, newCategory])
  }

  const removeCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
  }

  const updateCategoryName = (categoryId: string, name: string) => {
    setCategories(categories.map((cat) => (cat.id === categoryId ? { ...cat, name } : cat)))
  }

  const addSubItem = (categoryId: string, subItem: Omit<SubItem, "id">) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subItems: [...cat.subItems, { ...subItem, id: `item-${Date.now()}` }],
            }
          : cat,
      ),
    )
  }

  const removeSubItem = (categoryId: string, subItemId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subItems: cat.subItems.filter((item) => item.id !== subItemId),
            }
          : cat,
      ),
    )
  }

  const updateSubItem = (categoryId: string, subItemId: string, subItem: Partial<SubItem>) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subItems: cat.subItems.map((item) => (item.id === subItemId ? { ...item, ...subItem } : item)),
            }
          : cat,
      ),
    )
  }

  const getCategoryTotal = (categoryId: string): number => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return 0
    return category.subItems.reduce((sum, item) => sum + item.qty * item.pricePerUnit, 0)
  }

  const getTotalPrice = (): number => {
    return categories.reduce((sum, cat) => sum + getCategoryTotal(cat.id), 0)
  }

  const getSubtotal = (): number => {
    return getTotalPrice()
  }

  const getTotalAfterDiscount = (): number => {
    const subtotal = getSubtotal()
    return subtotal - discount
  }

  const getTaxAmount = (): number => {
    const totalAfterDiscount = getTotalAfterDiscount()
    return vatIncluded ? (totalAfterDiscount * taxRate) / 100 : 0
  }

  const getGrandTotal = (): number => {
    const totalAfterDiscount = getTotalAfterDiscount()
    const taxAmount = getTaxAmount()
    return totalAfterDiscount + taxAmount
  }

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
      }}
    >
      {children}
    </PricingContext.Provider>
  )
}
