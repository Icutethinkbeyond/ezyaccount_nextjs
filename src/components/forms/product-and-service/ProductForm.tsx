"use client";

import { Field, FieldProps, Form, Formik } from "formik";
import { FC, useState } from "react";
import { Box, TextField, Grid2, Autocomplete } from "@mui/material";
import BaseCard from "@/components/shared/BaseCard";
import ConfirmDelete from "@/components/shared/ConfirmDialogCustom";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { CategorySelect, initialProduct, Product } from "@/interfaces/Product";
import { ProductionQuantityLimitsOutlined, Save } from "@mui/icons-material";
import PageTitle from "@/components/shared/PageTitle";
import { useProductContext } from "@/contexts/ProductContext";
import DragDropImage from "@/components/shared/DragDropImage";

interface FormProps {
  viewOnly?: boolean;
}

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("กรุณากรอกชื่อสินค้า"),
});

const ProductForm: FC<FormProps> = ({ viewOnly = false }) => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { categorySelectState } = useProductContext();

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
          {({
            errors,
            touched,
            resetForm,
            values,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form>
              <Box p={3} border="1px solid #ccc" borderRadius="8px">
                <Grid2 size={12} container>
                  <PageTitle
                    title="เพิ่มสินค้า"
                    icon={<ProductionQuantityLimitsOutlined />}
                  />
                  <Grid2 container size={9} spacing={3}>
                    <Grid2 size={12} container>
                      <Grid2 size={{ xs: 6 }}>
                        <Field name="productName">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="productName"
                              label="ชื่อสินค้า (จำเป็น)"
                              value={values.productName}
                              onChange={(e) => {
                                setFieldValue("productName", e.target.value);
                              }}
                              error={
                                touched.productName &&
                                Boolean(errors.productName)
                              }
                              helperText={
                                touched.productName && errors.productName
                              }
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }}>
                        <Field name="productSKU">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="productSKU"
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                              label="SKU (ถ้ามี)"
                              value={values.productSKU ? values.productSKU : ""}
                              onChange={(e) => {
                                setFieldValue("productSKU", e.target.value);
                              }}
                              fullWidth
                            />
                          )}
                        </Field>
                      </Grid2>
                    </Grid2>

                    <Grid2 size={12} container>
                      <Grid2 size={{ xs: 6 }}>
                        <Field name="categoryId">
                          {({ field }: FieldProps) => (
                            <Autocomplete
                              disabled={isSubmitting || isLoading}
                              id="categoryId"
                              options={categorySelectState}
                              getOptionLabel={(option: CategorySelect) =>
                                option.categoryName
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.categoryId === value.categoryId
                              }
                              value={
                                categorySelectState.find(
                                  (cat) => cat.categoryId === values.categoryId
                                ) || null
                              }
                              onChange={(event, value) => {
                                setFieldValue(
                                  "categoryId",
                                  value ? value.categoryId : ""
                                );
                              }}
                              readOnly={viewOnly}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="หมวดหมู่"
                                  name="categoryId"
                                />
                              )}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }}>
                        <Field name="aboutProduct.productStock">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="aboutProduct.productStock"
                              label="จำนวนสินค้าในสต็อค (ถ้ามี)"
                              value={values.aboutProduct?.productStock}
                              onChange={(e) => {
                                setFieldValue(
                                  "aboutProduct.productStock",
                                  e.target.value
                                );
                              }}
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                    </Grid2>

                    <Grid2 size={{ xs: 12 }}>
                      <Field name="productDescription">
                        {({ field }: FieldProps) => (
                          <TextField
                            {...field}
                            name="productDescription"
                            multiline
                            rows={4}
                            slotProps={{
                              inputLabel: { shrink: true },
                            }}
                            label="รายละเอียด (ถ้ามี)"
                            value={
                              values.productDescription
                                ? values.productDescription
                                : ""
                            }
                            onChange={(e) => {
                              setFieldValue(
                                "productDescription",
                                e.target.value
                              );
                            }}
                            fullWidth
                          />
                        )}
                      </Field>
                    </Grid2>

                    <Grid2 size={12} container>
                      <Grid2 size={{ xs: 6 }}>
                        <Field name="aboutProduct.productPrice">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="aboutProduct.productPrice"
                              label="ราคาสินค้า (ถ้ามี)"
                              value={values.aboutProduct?.productPrice}
                              onChange={(e) => {
                                setFieldValue(
                                  "aboutProduct.productPrice",
                                  e.target.value
                                );
                              }}
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }}>
                        <Field name="aboutProduct.productDiscountPrice">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="aboutProduct.productDiscountPrice"
                              label="ราคาสินค้าที่ลด (ถ้ามี)"
                              value={values.aboutProduct?.productDiscountPrice}
                              onChange={(e) => {
                                setFieldValue(
                                  "aboutProduct.productDiscountPrice",
                                  e.target.value
                                );
                              }}
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  <Grid2 size={3} pl={2}>
                    <Field
                      name="productImage"
                      component={DragDropImage}
                      setFieldValue={setFieldValue}
                    />
                  </Grid2>
                </Grid2>
              </Box>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ mr: 1 }}
                  loading={isLoading}
                  startIcon={<Save />}
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
