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
  quotationName: Yup.string().required("กรุณากรอกชื่อหมวดหมู่"),
});

interface QuotationFormProps {
  setRecall: Dispatch<React.SetStateAction<boolean>>;
  recall: boolean;
}

const QuotationForm: FC<QuotationFormProps> = ({ setRecall, recall }) => {
  const { quotationForm, setQuotationForm, quotationEdit, setQuotationEdit }:any =
    useProductContext();
  // const { setOpenDialog, snackbar, setSnackbar } = useSnackbarContext();
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle form submission
  const handleFormSubmit = (
    value: Category,
    { resetForm, validateForm }: any
  ) => {
    validateForm(); // บังคับ validate หลังจากรีเซ็ต
    if (quotationEdit) {
      // updateQuotation(value);
    } else {
      // createQuotation(value);
    }
    resetForm(); // รีเซ็ตค่าฟอร์ม
  };

  // const updateQuotation = (quotation: Quotation) => {
  //   axios
  //     .patch("/api/equipment/quotation", quotation)
  //     .then(() => {
  //       setOpenDialog(true);
  //       setSnackbar({
  //         ...snackbar,
  //         message: `แก้ไขหมวดหมู่ ${quotation.quotationName} สำเร็จ`,
  //         notiColor: "success",
  //       });
  //       setRecall((prev) => !prev);
  //     })
  //     .catch((error) => {
  //       if (error.name === "AbortError") {
  //         console.log("Request cancelled");
  //       } else {
  //         console.error("Fetch error:", error);
  //         setOpenDialog(true);
  //         setSnackbar({
  //           ...snackbar,
  //           message: error.response.data,
  //           notiColor: "error",
  //         });
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //       setQuotationForm(initialQuotation);
  //       setQuotationEdit(false);
  //     });
  // };

  // const createQuotation = (quotation: Quotation) => {
  //   axios
  //     .post("/api/equipment/quotation", quotation)
  //     .then(() => {
  //       setOpenDialog(true);
  //       setSnackbar({
  //         ...snackbar,
  //         message: `สร้างหมวดหมู่ ${quotation.quotationName} สำเร็จ`,
  //         notiColor: "success",
  //       });
  //       setRecall((prev) => !prev);
  //     })
  //     .catch((error) => {
  //       if (error.name === "AbortError") {
  //         console.log("Request cancelled");
  //       } else {
  //         console.error("Fetch error:", error);
  //         setOpenDialog(true);
  //         setSnackbar({
  //           ...snackbar,
  //           message: error.response.data,
  //           notiColor: "error",
  //         });
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //       setQuotationForm(initialQuotation);
  //     });
  // };

  return (
    <BaseCard>
      <>
        <Formik
          initialValues={quotationForm} // ใช้ state เป็น initialValues
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
                          สร้างใบเสนอราคา
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  
                  <Grid2 container size={{ xs: 12 }} sx={{ mb: 1 }}>
                    <Grid2 container size={{ xs: 6 }} spacing={2}>
                      <Grid2  size={{ xs: 6 }} mb={2} >
                        <Field name="companyName">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="companyTel"
                              label="ชื่อบริษัท (จำเป็น)"
                              // value={values.companyName}
                              onChange={(e) => {
                                setFieldValue("companyName", e.target.value);
                              }}
                              // error={
                              //   touched.companyName && Boolean(errors.companyName)
                              // }
                              // helperText={
                              //   touched.companyName && errors.companyName
                              // }
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }} mb={2}>
                        <Field name="companyTel">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="companyTel"
                              label="เบอร์โทร.บริษัท (จำเป็น)"
                              // value={values.companyTel}
                              onChange={(e) => {
                                setFieldValue("companyTel", e.target.value);
                              }}
                              // error={
                              //   touched.companyTel && Boolean(errors.companyTel)
                              // }
                              // helperText={
                              //   touched.companyTel && errors.companyTel
                              // }
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 12 }} mb={2}>
                        <Field name="companyAddress">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="companyAddress"
                              label="ที่อยู่บริษัท"
                              // value={values.companyAddress}
                              onChange={(e) => {
                                setFieldValue("companyAddress", e.target.value);
                              }}
                              // error={
                              //   touched.companyAddress && Boolean(errors.companyAddress)
                              // }
                              // helperText={
                              //   touched.companyAddress && errors.companyAddress
                              // }
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }} mb={2}>
                        <Field name="companyTaxid">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="companyTaxid"
                              label="เลขที่เสียภาษี"
                              // value={values.companyTaxid}
                              onChange={(e) => {
                                setFieldValue("companyTaxid", e.target.value);
                              }}
                              // error={
                              //   touched.companyTaxid && Boolean(errors.companyTaxid)
                              // }
                              // helperText={
                              //   touched.companyTaxid && errors.companyTaxid
                              // }
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }} mb={2}>
                        <Field name="companyBranch">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="companyBranch"
                              label="สำนักงาน/สาขา"
                              // value={values.companyBranch}
                              onChange={(e) => {
                                setFieldValue("companyBranch", e.target.value);
                              }}
                              // error={
                              //   touched.companyBranch && Boolean(errors.companyBranch)
                              // }
                              // helperText={
                              //   touched.companyBranch && errors.companyBranch
                              // }
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                    </Grid2>

                    <Grid2 container size={{ xs: 6 }} spacing={2}>
                      <Grid2  size={{ xs: 6 }} mb={2} >
                        <Field name="customerName">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="customerName"
                              label="ชื่อลูกค้า"
                              // value={values.customerName}
                              onChange={(e) => {
                                setFieldValue("customerName", e.target.value);
                              }}
                              // error={
                              //   touched.customerName && Boolean(errors.customerName)
                              // }
                              // helperText={
                              //   touched.customerName && errors.customerName
                              // }
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }} mb={2}>
                        <Field name="customerTel">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="customerTel"
                              label="เบอร์โทร."
                              // value={values.customerTel}
                              onChange={(e) => {
                                setFieldValue("customerTel", e.target.value);
                              }}
                              // error={
                              //   touched.customerTel && Boolean(errorscustomerTel)
                              // }
                              // helperText={
                              //   touched.customerTel && errors.customerTel
                              // }
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }} mb={2}>
                        <Field name="creataDate">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="creataDate"
                              label="วันที่ออก"
                              // value={values.creataDate}
                              onChange={(e) => {
                                setFieldValue("creataDate", e.target.value);
                              }}
                              // error={
                              //   touched.creataDate && Boolean(errors.creataDate)
                              // }
                              // helperText={
                              //   touched.creataDate && errors.creataDate
                              // }
                              fullWidth
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                            />
                          )}
                        </Field>
                      </Grid2>
                      <Grid2 size={{ xs: 6 }} mb={2}>
                        <Field name="expDate">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              name="expDate"
                              label="ใช้ได้ถึง"
                              // value={values.expDate}
                              onChange={(e) => {
                                setFieldValue("expDate", e.target.value);
                              }}
                              // error={
                              //   touched.expDate && Boolean(errors.expDate)
                              // }
                              // helperText={
                              //   touched.expDate && errors.expDate
                              // }
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

                  
                  <Grid2 size={{ xs: 5 }} mb={2}>
                    <Field name="detail">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="detail"
                          label="คำอธิบาย"
                          // value={values.detail}
                          onChange={(e) => {
                            setFieldValue("detail", e.target.value);
                          }}
                          // error={
                          //   touched.detail && Boolean(errors.detail)
                          // }
                          // helperText={
                          //   touched.detail && errors.detail
                          // }
                          fullWidth
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    </Field>
                  </Grid2>
                  <Grid2 size={{ xs: 2 }} mb={2}>
                    <Field name="companyTel">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="companyTel"
                          label="เบอร์โทร.บริษัท(จำเป็น)"
                          // value={values.companyTel}
                          onChange={(e) => {
                            setFieldValue("companyTel", e.target.value);
                          }}
                          // error={
                          //   touched.companyTel && Boolean(errors.companyTel)
                          // }
                          // helperText={
                          //   touched.companyTel && errors.companyTel
                          // }
                          fullWidth
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    </Field>
                  </Grid2>
                  <Grid2 size={{ xs: 2 }} mb={2}>
                    <Field name="companyTel">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="companyTel"
                          label="เบอร์โทร.บริษัท(จำเป็น)"
                          // value={values.companyTel}
                          onChange={(e) => {
                            setFieldValue("companyTel", e.target.value);
                          }}
                          // error={
                          //   touched.companyTel && Boolean(errors.companyTel)
                          // }
                          // helperText={
                          //   touched.companyTel && errors.companyTel
                          // }
                          fullWidth
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    </Field>
                  </Grid2>
                  <Grid2 size={{ xs: 2 }} mb={2}>
                    <Field name="companyTel">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="companyTel"
                          label="เบอร์โทร.บริษัท(จำเป็น)"
                          // value={values.companyTel}
                          onChange={(e) => {
                            setFieldValue("companyTel", e.target.value);
                          }}
                          // error={
                          //   touched.companyTel && Boolean(errors.companyTel)
                          // }
                          // helperText={
                          //   touched.companyTel && errors.companyTel
                          // }
                          fullWidth
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    </Field>
                  </Grid2>
                  <Grid2 size={{ xs: 1 }} mb={2}>
                    <Field name="companyTel">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="companyTel"
                          label="เบอร์โทร.บริษัท(จำเป็น)"
                          // value={values.companyTel}
                          onChange={(e) => {
                            setFieldValue("companyTel", e.target.value);
                          }}
                          // error={
                          //   touched.companyTel && Boolean(errors.companyTel)
                          // }
                          // helperText={
                          //   touched.companyTel && errors.companyTel
                          // }
                          fullWidth
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
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
                  // loading={isLoading}
                >
                  {/* {!quotationEdit ? "เพิ่มหมวดหมู่" : "แก้ไขหมวดหมู่"} */}
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

export default QuotationForm;
