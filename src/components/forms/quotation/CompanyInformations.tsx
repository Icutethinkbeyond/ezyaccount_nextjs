import React, { useEffect } from "react";
import { Grid2, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormSection from "../../shared/FormSection";
import { HeadForm, useQuotationListContext } from "@/contexts/QuotationContext";

// Validation Schema with Yup
const CompanyInformationSchema = Yup.object({
  // companyName: Yup.string().required("ชื่อบริษัทจำเป็นต้องกรอก"),
  // companyTel: Yup.string().required("เบอร์โทรจำเป็นต้องกรอก"),
  // taxId: Yup.string().required("เลขที่เสียภาษีจำเป็นต้องกรอก"),
  // // branch: Yup.string().required("สาขาจำเป็นต้องกรอก"),
  // dateCreate: Yup.date().required("วันที่สร้างจำเป็นต้องกรอก"),
  // companyAddress: Yup.string().required("ที่อยู่จำเป็นต้องกรอก"),
});

const CompanyInformation: React.FC = () => {

  const { footerForm, setFooterForm, headForm, products, setHeadForm } =
    useQuotationListContext();

  return (
    <>
      <Formik<HeadForm>
        initialValues={headForm}
        validationSchema={CompanyInformationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log("บันทึกข้อมูล:", values);
          setHeadForm(values);
        }}
      >
        {({ touched, errors, values }) => {
          useEffect(() => {
            setHeadForm(values);
          }, [values, setHeadForm]);

          return (
            <Form>
              <FormSection title="ข้อมูลบริษัท">
                <Grid2 container spacing={2} mt={5}></Grid2>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <Field
                      name="companyName"
                      as={TextField}
                      label="ชื่อบริษัท"
                      variant="outlined"
                      size="small"
                      fullWidth
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
                      multiline
                      rows={3}
                      error={
                        touched.companyAddress && Boolean(errors.companyAddress)
                      }
                      helperText={<ErrorMessage name="companyAddress" />}
                    />
                  </Grid2>
                </Grid2>
              </FormSection>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CompanyInformation;
