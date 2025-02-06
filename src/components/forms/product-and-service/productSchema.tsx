import * as Yup from "yup"

export const productSchema = Yup.object().shape({
  name: Yup.string().required("กรุณากรอกชื่อสินค้า/บริการ"),
  category: Yup.string().required("กรุณาเลือกหมวดหมู่สินค้า"),
  quantity: Yup.number().min(0, "จำนวนต้องไม่ต่ำกว่า 0").required("กรุณากรอกจำนวนสินค้า"),
  details: Yup.string(),
  regularPrice: Yup.number().min(0, "ราคาต้องไม่ต่ำกว่า 0").required("กรุณากรอกราคาปกติ"),
  salePrice: Yup.number().min(0, "ราคาต้องไม่ต่ำกว่า 0"),
  productCode: Yup.string(),
  image: Yup.mixed(),
})

