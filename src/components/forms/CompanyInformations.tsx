import React, { useEffect } from "react";
import { Grid2, TextField, Box, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import BaseCard from "../shared/BaseCard";
import { HeadForm, useQuotationListContext } from "@/contexts/QuotationContext";

// Validation Schema with Yup
const CompanyInformationSchema = Yup.object({
  companyName: Yup.string().required("ชื่อบริษัทจำเป็นต้องกรอก"),
  companyTel: Yup.string().required("เบอร์โทรจำเป็นต้องกรอก"),
  taxId: Yup.string().required("เลขที่เสียภาษีจำเป็นต้องกรอก"),
  branch: Yup.string().required("สาขาจำเป็นต้องกรอก"),
  dateCreate: Yup.date().required("วันที่สร้างจำเป็นต้องกรอก"),
  companyAddress: Yup.string().required("ที่อยู่จำเป็นต้องกรอก"),
});

const CompanyInformation: React.FC = () => {

  const { footerForm, setFooterForm, headForm, products, setHeadForm } = useQuotationListContext();

  return (
    <BaseCard>
      <Formik<HeadForm>
        initialValues={headForm}
        validationSchema={CompanyInformationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log("บันทึกข้อมูล:", values);
          setHeadForm(values);
        }}
        // initialValues={{
        //   companyName: "",
        //   companyTel: "",
        //   taxId: "",
        //   branch: "",
        //   dateCreate: "",
        //   companyAddress: "",
        // }}
        // validationSchema={CompanyInformationSchema}
        // onSubmit={(values) => {
        //   console.log(values); // Handle form submission
        // }}
      >
        {({ touched, errors, values }) => { 

          useEffect(() => {
            setHeadForm(values);
          }, [values, setHeadForm]);

          return (
          <Form>
            <Box p={3} border="1px solid #ccc" borderRadius="8px">
              <Typography variant="h6" gutterBottom>
                ข้อมูลบริษัท
              </Typography>
              <Typography
                style={{ marginBottom: 20 }}
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                กรอกข้อมูลให้ครบถ้วน
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  <Field
                    name="companyName"
                    as={TextField}
                    label="ชื่อบริษัท"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    error={touched.companyName && Boolean(errors.companyName)}
                    helperText={<ErrorMessage name="companyName" />}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Field
                    name="companyTel"
                    as={TextField}
                    label="เบอร์โทร"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    error={touched.companyTel && Boolean(errors.companyTel)}
                    helperText={<ErrorMessage name="companyTel" />}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Field
                    name="taxId"
                    as={TextField}
                    label="เลขที่เสียภาษี"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    error={touched.taxId && Boolean(errors.taxId)}
                    helperText={<ErrorMessage name="taxId" />}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Field
                    name="branch"
                    as={TextField}
                    label="สาขา"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    error={touched.branch && Boolean(errors.branch)}
                    helperText={<ErrorMessage name="branch" />}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Field
                    name="dateCreate"
                    as={TextField}
                    label="วันที่สร้าง"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.dateCreate && Boolean(errors.dateCreate)}
                    helperText={<ErrorMessage name="dateCreate" />}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Field
                    name="companyAddress"
                    as={TextField}
                    label="ที่อยู่"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    multiline
                    rows={3}
                    error={
                      touched.companyAddress && Boolean(errors.companyAddress)
                    }
                    helperText={<ErrorMessage name="companyAddress" />}
                  />
                </Grid2>
              </Grid2>
            </Box>
          </Form>
        )} }
      </Formik>
    </BaseCard>
  );
};

export default CompanyInformation;
