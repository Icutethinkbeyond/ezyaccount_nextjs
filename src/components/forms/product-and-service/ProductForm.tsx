"use client";

import { Field, FieldProps, Form, Formik, useFormik } from "formik";
import { FC, useState } from "react";
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
  Grid2,
  Avatar,
} from "@mui/material";
import { productSchema } from "@/components/forms/product-and-service/productSchema";
import BaseCard from "@/components/shared/BaseCard";
import ConfirmDelete from "@/components/shared/ConfirmDialogCustom";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { initialProduct, Product } from "@/interfaces/Product";
import { Category, ProductionQuantityLimits } from "@mui/icons-material";

interface FormProps {}

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("กรุณากรอกชื่อหมวดหมู่"),
});

const ProductForm: FC<FormProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = (
    value: Product,
    { resetForm, validateForm }: any
  ) => {};

  return (
    <BaseCard>
      <>
        <Formik<Product>
          initialValues={initialProduct} // ใช้ state เป็น initialValues
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize // เพื่อให้ Formik อัปเดตค่าจาก useState
        >
          {({ errors, touched, resetForm, values, setFieldValue }) => (
            <Form>
              <Box p={3} border="1px solid #ccc" borderRadius="8px">
                <Grid2 container spacing={2}>
                  <Grid2 size={8}>
                  <Grid2 size={{ xs: 12 }} sx={{ mb: 1 }}>
                    <Grid2 size={{ xs: 12 }} mb={2}>
                      <Grid2 container alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <ProductionQuantityLimits fontSize="small" />
                        </Avatar>
                        <Typography variant="h4" gutterBottom ml={2} mt={0.5}>
                          เพิ่มสินค้า
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>

                  <Grid2 size={{ xs: 12 }} mb={2}>
                    <Field name="categoryName">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="categoryName"
                          label="ชื่อหมวดหมู่ (จำเป็น)"
                          value={values.categoryName}
                          onChange={(e) => {
                            setFieldValue("categoryName", e.target.value);
                          }}
                          error={
                            touched.categoryName && Boolean(errors.categoryName)
                          }
                          helperText={
                            touched.categoryName && errors.categoryName
                          }
                          fullWidth
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    </Field>
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Field name="categoryDesc">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="categoryDesc"
                          multiline
                          rows={4}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                          label="รายละเอียดหมวดหมู่ (ถ้ามี)"
                          value={values.categoryDesc ? values.categoryDesc : ""}
                          onChange={(e) => {
                            setFieldValue("categoryDesc", e.target.value);
                          }}
                          fullWidth
                        />
                      )}
                    </Field>
                  </Grid2>
                  </Grid2>
                  <Grid2 size={4}>
                </Grid2>
              </Box>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ mr: 1 }}
                  loading={isLoading}
                >
                  บันทึก
                </LoadingButton>
                <ConfirmDelete
                  itemId={""}
                  onDelete={() => resetForm()}
                  massage={`คุณต้องการล้างฟอร์มใช่หรือไม่?`}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </>
    </BaseCard>
  );
};

export default ProductForm;
