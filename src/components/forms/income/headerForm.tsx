import React, { ChangeEvent } from "react";
import { Box, Typography, Grid, TextField, Grid2 } from "@mui/material";
import { useProductServiceListContext } from "@/contexts/productServiceListContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const HeaderForm: React.FC = () => {
  const { headForm, setHeadForm } = useProductServiceListContext();

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    quotationNumber: Yup.string().required("กรุณากรอกรหัสใบเสนอราคา"),
    contactorName: Yup.string().required("กรุณากรอกชื่อผู้ติดต่อ"),
    contactorTel: Yup.string()
      .required("กรุณากรอกเบอร์โทรศัพท์")
      .matches(/^[0-9]{10}$/, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
    contactorEmail: Yup.string()
      .email("กรุณากรอกอีเมล์ให้ถูกต้อง")
      .required("กรุณากรอกอีเมล์"),
    contactorAddress: Yup.string().required("กรุณากรอกที่อยู่ผู้ติดต่อ"),
    companyName: Yup.string().required("กรุณากรอกชื่อบริษัท"),
    companyTel: Yup.string()
      .required("กรุณากรอกเบอร์โทรบริษัท")
      .matches(/^[0-9]{10}$/, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
    taxId: Yup.string().required("กรุณากรอกเลขผู้เสียภาษี"),
    branch: Yup.string().required("กรุณากรอกสาขา"),
    dateCreate: Yup.string().required("กรุณากรอกวันที่"),
    companyAddress: Yup.string().required("กรุณากรอกที่อยู่บริษัท"),
    note: Yup.string(),
  });

  const handleSubmit = (values: typeof headForm) => {
    setHeadForm(values);
    console.log(values); // หรือทำสิ่งอื่น ๆ หลังจาก submit
  };

  return (
    <Formik
      initialValues={headForm}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <Box component="form" noValidate autoComplete="off">
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="quotationNumber"
                  as={TextField}
                  label="Quotation Number"
                  variant="outlined"
                  value={values.quotationNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  fullWidth
                  error={
                    touched.quotationNumber && Boolean(errors.quotationNumber)
                  }
                  helperText={<ErrorMessage name="quotationNumber" />}
                />
              </Grid2>
            </Grid2>

            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 2, mt: 4, textAlign: "left" }}
            >
              ข้อมูลผู้ติดต่อ
            </Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="contactorName"
                  as={TextField}
                  label="ชื่อผู้ติดต่อ"
                  variant="outlined"
                  value={values.contactorName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  fullWidth
                  error={touched.contactorName && Boolean(errors.contactorName)}
                  helperText={<ErrorMessage name="contactorName" />}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="contactorTel"
                  as={TextField}
                  label="เบอร์โทร."
                  variant="outlined"
                  value={values.contactorTel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  fullWidth
                  error={touched.contactorTel && Boolean(errors.contactorTel)}
                  helperText={<ErrorMessage name="contactorTel" />}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="contactorEmail"
                  as={TextField}
                  label="อีเมล์"
                  variant="outlined"
                  value={values.contactorEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  type="email"
                  fullWidth
                  error={
                    touched.contactorEmail && Boolean(errors.contactorEmail)
                  }
                  helperText={<ErrorMessage name="contactorEmail" />}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="contactorAddress"
                  as={TextField}
                  label="ที่อยู่"
                  variant="outlined"
                  value={values.contactorAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  fullWidth
                  multiline
                  rows={3}
                  error={
                    touched.contactorAddress && Boolean(errors.contactorAddress)
                  }
                  helperText={<ErrorMessage name="contactorAddress" />}
                />
              </Grid2>
            </Grid2>

            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 2, mt: 4, textAlign: "left" }}
            >
              ข้อมูลบริษัท
            </Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="companyName"
                  as={TextField}
                  label="ชื่อบริษัท"
                  variant="outlined"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  fullWidth
                  error={touched.companyName && Boolean(errors.companyName)}
                  helperText={<ErrorMessage name="companyName" />}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="companyTel"
                  as={TextField}
                  label="เบอร์โทร."
                  variant="outlined"
                  value={values.companyTel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  fullWidth
                  error={touched.companyTel && Boolean(errors.companyTel)}
                  helperText={<ErrorMessage name="companyTel" />}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="taxId"
                  as={TextField}
                  label="เลขผู้เสียภาษี"
                  variant="outlined"
                  value={values.taxId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  fullWidth
                  error={touched.taxId && Boolean(errors.taxId)}
                  helperText={<ErrorMessage name="taxId" />}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="branch"
                  as={TextField}
                  label="สาขา"
                  variant="outlined"
                  value={values.branch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  fullWidth
                  error={touched.branch && Boolean(errors.branch)}
                  helperText={<ErrorMessage name="branch" />}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="dateCreate"
                  as={TextField}
                  label="วันที่"
                  variant="outlined"
                  value={values.dateCreate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={touched.dateCreate && Boolean(errors.dateCreate)}
                  helperText={<ErrorMessage name="dateCreate" />}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="companyAddress"
                  as={TextField}
                  label="ที่อยู่"
                  variant="outlined"
                  value={values.companyAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  required
                  fullWidth
                  multiline
                  rows={3}
                  error={
                    touched.companyAddress && Boolean(errors.companyAddress)
                  }
                  helperText={<ErrorMessage name="companyAddress" />}
                />
              </Grid2>
            </Grid2>

            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 2, mt: 4, textAlign: "left" }}
            >
              แนบไฟล์
            </Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="companyTel"
                  as={TextField}
                  type="file"
                  variant="outlined"
                  fullWidth
                  required
                  disabled
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <Field
                  name="note"
                  as={TextField}
                  label="หมายเหตุ"
                  variant="outlined"
                  size="small"
                  value={values.note}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid2>
            </Grid2>

            <button type="submit">Submit</button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default HeaderForm;
