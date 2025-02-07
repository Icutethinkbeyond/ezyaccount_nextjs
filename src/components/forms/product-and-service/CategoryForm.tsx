import React, { Dispatch, FC, useState } from "react";
import {
  Box,
  Typography,
  Grid2,
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material";
import BaseCard from "@/components/shared/BaseCard";
import { Category, initialCategory } from "@/interfaces/Product";
import * as Yup from "yup";
import { Field, FieldProps, Form, Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useProductContext } from "@/contexts/ProductContext";
import ConfirmDelete from "@/components/shared/ConfirmDialogCustom";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import axios from "axios";
import { Barcode } from "lucide-react";
import CategoryIcon from "@mui/icons-material/Category";

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("กรุณากรอกชื่อหมวดหมู่"),
});

interface CategoryFormProps {
  setRecall: Dispatch<React.SetStateAction<boolean>>;
  recall: boolean;
}

const CategoryForm: FC<CategoryFormProps> = ({ setRecall, recall }) => {
  const { categoryForm, setCategoryForm, categoryEdit, setCategoryEdit } =
    useProductContext();
  const { setOpenDialog, snackbar, setSnackbar } = useSnackbarContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle form submission
  const handleFormSubmit = (
    value: Category,
    { resetForm, validateForm }: any
  ) => {
    validateForm(); // บังคับ validate หลังจากรีเซ็ต
    if (categoryEdit) {
      updateCategory(value);
    } else {
      createCategory(value);
    }
    resetForm(); // รีเซ็ตค่าฟอร์ม
  };

  const updateCategory = (category: Category) => {
    axios
      .patch("/api/equipment/category", category)
      .then(() => {
        setOpenDialog(true);
        setSnackbar({
          ...snackbar,
          message: `แก้ไขหมวดหมู่ ${category.categoryName} สำเร็จ`,
          notiColor: "success",
        });
        setRecall((prev) => !prev);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request cancelled");
        } else {
          console.error("Fetch error:", error);
          setOpenDialog(true);
          setSnackbar({
            ...snackbar,
            message: error.response.data,
            notiColor: "error",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        setCategoryForm(initialCategory);
        setCategoryEdit(false);
      });
  };

  const createCategory = (category: Category) => {
    axios
      .post("/api/equipment/category", category)
      .then(() => {
        setOpenDialog(true);
        setSnackbar({
          ...snackbar,
          message: `สร้างหมวดหมู่ ${category.categoryName} สำเร็จ`,
          notiColor: "success",
        });
        setRecall((prev) => !prev);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request cancelled");
        } else {
          console.error("Fetch error:", error);
          setOpenDialog(true);
          setSnackbar({
            ...snackbar,
            message: error.response.data,
            notiColor: "error",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        setCategoryForm(initialCategory);
      });
  };

  return (
    <BaseCard>
      <>
        <Formik
          initialValues={categoryForm} // ใช้ state เป็น initialValues
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize // เพื่อให้ Formik อัปเดตค่าจาก useState
        >
          {({ errors, touched, resetForm, values, setFieldValue }) => (
            <Form>
              <Box p={3} border="1px solid #ccc" borderRadius="8px">
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12 }} sx={{ mb: 1 }}>
                    <Grid2 size={{ xs: 12 }} mb={2}>
                      <Grid2 container alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <CategoryIcon fontSize="small" />
                        </Avatar>
                        <Typography variant="h4" gutterBottom ml={2} mt={0.5}>
                          เพิ่มหมวดหมู่สินค้า
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>

                  {/* Issue Date */}
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
                          multiline // เพิ่มคุณสมบัตินี้เพื่อทำให้ TextField เป็น textarea
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
              </Box>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ mr: 1 }}
                  loading={isLoading}
                >
                  {!categoryEdit ? "เพิ่มหมวดหมู่" : "แก้ไขหมวดหมู่"}
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

export default CategoryForm;
