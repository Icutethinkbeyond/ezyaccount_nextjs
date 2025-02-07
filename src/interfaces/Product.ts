import { Equipment, EquipmentQuery } from "./Equipment";


// Category
export interface Category {
  categoryId: string;
  categoryName: string;
  categoryDesc?: string;
  equipments: Equipment[];
  _count?: {
    equipments: number
  }
}

export interface CategoryQuery {
  categoryId: string;
  categoryName: string;
  categoryDesc?: string | null | undefined;
  equipments: EquipmentQuery[];
  _count?: {
    equipments: number
  }
}

export const initialCategory: Category = {
  categoryId: '',
  categoryName: '',
  categoryDesc: '',
  equipments: [],
};

export type CategorySelect = {
  categoryId: string; // ID ของหมวดหมู่
  categoryName: string; // ชื่อของหมวดหมู่
};
