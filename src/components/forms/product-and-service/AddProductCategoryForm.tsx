"use client"

import { useFormik } from "formik"
import * as Yup from "yup"
import { Box, Button, TextField, MenuItem, Typography, Paper, Stack } from "@mui/material"
import Image from "next/image"
import type React from "react" // Added import for React

// Validation schema
const validationSchema = Yup.object({
  categoryName: Yup.string().required("กรุณากรอกชื่อหมวดหมู่สินค้า"),
  categoryType: Yup.string().required("กรุณาเลือกประเภทหมวดหมู่"),
  details: Yup.string(),
  image: Yup.mixed(),
})

// Category type options
const categoryTypes = [
  { value: "product", label: "สินค้า" },
  { value: "service", label: "บริการ" },
]

export default function ProductCategoryForm() {
  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryType: "",
      details: "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values)
      // Handle form submission here
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formik.setFieldValue("image", event.currentTarget.files[0])
    }
  }

  return (
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          {/* <Typography variant="h5" component="h1" gutterBottom>
            หมวดหมู่สินค้า/บริการ
          </Typography> */}

          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="ชื่อหมวดหมู่สินค้า"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
            error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
            helperText={formik.touched.categoryName && formik.errors.categoryName}
          />

          <TextField
            fullWidth
            id="categoryType"
            name="categoryType"
            select
            label="ประเภทหมวดหมู่"
            value={formik.values.categoryType}
            onChange={formik.handleChange}
            error={formik.touched.categoryType && Boolean(formik.errors.categoryType)}
            helperText={formik.touched.categoryType && formik.errors.categoryType}
          >
            {categoryTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            id="details"
            name="details"
            label="รายละเอียด"
            multiline
            rows={4}
            value={formik.values.details}
            onChange={formik.handleChange}
            error={formik.touched.details && Boolean(formik.errors.details)}
            helperText={formik.touched.details && formik.errors.details}
          />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              เพิ่มรูป
            </Typography>
            <Box
              sx={{
                width: 200,
                height: 200,
                border: "1px dashed grey",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              {formik.values.image ? (
                <Image
                  src={URL.createObjectURL(formik.values.image as File) || "/placeholder.svg"}
                  alt="Preview"
                  width={200}
                  height={200}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <Typography color="text.secondary">IMAGE</Typography>
              )}
            </Box>
            <Button variant="outlined" component="label">
              Browse...
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" sx={{ minWidth: 120 }}>
              บันทึก
            </Button>
          </Box>
        </Stack>
      </form>
  )
}

