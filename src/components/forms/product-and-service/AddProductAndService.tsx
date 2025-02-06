"use client"

import { useFormik } from "formik"
import { useState } from "react"
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material"
import { Editor } from "@tinymce/tinymce-react"
import { productSchema } from "@/components/forms/product-and-service/productSchema"

const categories = [
  { value: "electronics", label: "เครื่องใช้ไฟฟ้า" },
  { value: "clothing", label: "เสื้อผ้า" },
  { value: "food", label: "อาหาร" },
]

export default function ProductForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      quantity: "",
      details: "",
      regularPrice: "",
      salePrice: "",
      productCode: "1053929195",
      image: null,
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      console.log(values)
      // Handle form submission here
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (file) {
      formik.setFieldValue("image", file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          ข้อมูลสินค้า/บริการ
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="ชื่อสินค้า/บริการ"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              disabled
              id="productCode"
              name="productCode"
              label="รหัสสินค้า"
              value={formik.values.productCode}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>หมวดหมู่สินค้า</InputLabel>
              <Select
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                label="หมวดหมู่สินค้า"
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="จำนวนสินค้าทั้งหมดในสต็อก"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              รายละเอียด
            </Typography>
            <Editor
              apiKey="your-tinymce-key"
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
              }}
              value={formik.values.details}
              onEditorChange={(content) => formik.setFieldValue("details", content)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="regularPrice"
              name="regularPrice"
              label="ราคาปกติ"
              type="number"
              value={formik.values.regularPrice}
              onChange={formik.handleChange}
              error={formik.touched.regularPrice && Boolean(formik.errors.regularPrice)}
              helperText={formik.touched.regularPrice && formik.errors.regularPrice}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="salePrice"
              name="salePrice"
              label="ราคาส่วนลด"
              type="number"
              value={formik.values.salePrice}
              onChange={formik.handleChange}
              error={formik.touched.salePrice && Boolean(formik.errors.salePrice)}
              helperText={formik.touched.salePrice && formik.errors.salePrice}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                เพิ่มรูป
              </Typography>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                  เลือกไฟล์
                </Button>
              </label>
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button variant="contained" color="primary" type="submit" size="large">
                บันทึก
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
  )
}

