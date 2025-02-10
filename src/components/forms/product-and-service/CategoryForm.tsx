import React, { FC, useEffect } from "react";
import {
  Box,
  Typography,
  Grid2,
  TextField,
  Avatar,
  Button,
} from "@mui/material";
import BaseCard from "@/components/shared/BaseCard";
import { Category, initialCategory } from "@/interfaces/Product";
import * as Yup from "yup";
import { Field, FieldProps, Form, Formik } from "formik";
import { useProductContext } from "@/contexts/ProductContext";
import ConfirmDelete from "@/components/shared/ConfirmDialogCustom";
import { useNotifyContext } from "@/contexts/NotifyContext";
import CategoryIcon from "@mui/icons-material/Category";
import { categoryService } from "@/services/api/ProductService";
import { Save } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

interface CategoryFormProps {}

const CategoryForm: FC<CategoryFormProps> = ({}) => {
  const { categoryForm, setCategoryForm } = useProductContext();
  const { setNotify, setOpenBackdrop, openBackdrop } = useNotifyContext();

  const pathname = usePathname();
  const params = useSearchParams();
  const localActive = useLocale();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("กรุณากรอกชื่อหมวดหมู่"),
  });

  // Handle form submission
  const handleFormSubmit = (
    value: Category,
    { resetForm, validateForm }: any
  ) => {
    validateForm(); // บังคับ validate หลังจากรีเซ็ต
    if (!pathname.includes("new")) {
      handleUpdateCategory(value);
    } else {
      handleCreateCategory(value);
    }
    resetForm(); // รีเซ็ตค่าฟอร์ม
  };

  const handleUpdateCategory = async (category: Category) => {
    setOpenBackdrop(true);
    const result = await categoryService.updateCategory(category);
    setOpenBackdrop(false);
    setNotify({
      open: true,
      message: result.message,
      color: result.success ? "success" : "error",
    });
    if (result.success) {
      handleRedirect();
    }
  };

  const handleCreateCategory = async (category: Category) => {
    setOpenBackdrop(true);
    const result = await categoryService.createCategory(category);
    setOpenBackdrop(false);
    setNotify({
      open: true,
      message: result.message,
      color: result.success ? "success" : "error",
    });
    if (result.success) {
      handleRedirect();
    }
  };

  const handleRedirect = () => {
    router.push(`/${localActive}/protected/product-and-service/category`);
  };

  const handleGetCategory = async (categoryId: string) => {
    setOpenBackdrop(true);
    const result = await categoryService.getCategory(categoryId);
    if (result.success) {
      setCategoryForm(result.data);
    }
    setOpenBackdrop(false);
    setNotify({
      open: true,
      message: result.message,
      color: result.success ? "success" : "error",
    });
  };

  useEffect(() => {
    const categoryId = params.get("categoryId");
    if (!pathname.includes("new")) {
      if (categoryId) handleGetCategory(categoryId);
    }
    // คืนค่าเริ่มต้นเมื่อปิดหน้าหรือเปลี่ยนหน้า
    return () => {
      setCategoryForm(initialCategory);
    };
  }, []);

  return (
    <BaseCard>
      <>
        <Formik
          initialValues={categoryForm} // ใช้ state เป็น initialValues
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

                  <Grid2 size={{ xs: 12 }} mb={2}>
                    <Field name="categoryName">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="categoryName"
                          label="ชื่อหมวดหมู่ (จำเป็น)"
                          value={values.categoryName}
                          disabled={isSubmitting || openBackdrop}
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
                          disabled={isSubmitting || openBackdrop}
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
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ mr: 1 }}
                  disabled={isSubmitting || openBackdrop}
                  startIcon={<Save />}
                >
                  บันทึก
                </Button>
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
