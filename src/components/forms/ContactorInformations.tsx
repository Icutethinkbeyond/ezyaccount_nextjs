import React, { useEffect } from "react";
import { Grid2, TextField, Box, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import BaseCard from "../shared/BaseCard";
import { HeadForm, useQuotationListContext } from "@/contexts/QuotationContext";

// Validation Schema with Yup
const ContactotInformationSchema = Yup.object({
  contactorName: Yup.string().required("ชื่อผู้ติดต่อจำเป็นต้องกรอก"),
  contactorTel: Yup.string().required("เบอร์โทรจำเป็นต้องกรอก"),
  contactorEmail: Yup.string()
    .email("อีเมล์ไม่ถูกต้อง")
    .required("อีเมล์จำเป็นต้องกรอก"),
  contactorAddress: Yup.string().required("ที่อยู่จำเป็นต้องกรอก"),
});

const ContactotInformation: React.FC = () => {

  const { footerForm, setFooterForm, headForm, products, setHeadForm } = useQuotationListContext();

  
  return (
    <>
      <Formik<HeadForm>
        initialValues={headForm}
        validationSchema={ContactotInformationSchema}
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
            <Box p={3} border="1px solid #ccc" borderRadius="8px">
              <Typography variant="h3" gutterBottom>
                ข้อมูลลูกค้า
              </Typography>
              <Grid2 container spacing={2} mt={5}>
                <Grid2 size={12}>
                  <Field
                    name="contactorName"
                    as={TextField}
                    label="ชื่อผู้ติดต่อ"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    error={
                      touched.contactorName && Boolean(errors.contactorName)
                    }
                    helperText={<ErrorMessage name="contactorName" />}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Field
                    name="contactorTel"
                    as={TextField}
                    label="เบอร์โทร"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    error={touched.contactorTel && Boolean(errors.contactorTel)}
                    helperText={<ErrorMessage name="contactorTel" />}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Field
                    name="contactorEmail"
                    as={TextField}
                    label="อีเมล์"
                    variant="outlined"
                    size="small"
                    type="email"
                    fullWidth
                    required
                    error={
                      touched.contactorEmail && Boolean(errors.contactorEmail)
                    }
                    helperText={<ErrorMessage name="contactorEmail" />}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Field
                    name="contactorAddress"
                    as={TextField}
                    label="ที่อยู่"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    multiline
                    rows={3}
                    error={
                      touched.contactorAddress &&
                      Boolean(errors.contactorAddress)
                    }
                    helperText={<ErrorMessage name="contactorAddress" />}
                  />
                </Grid2>
              </Grid2>
            </Box>
          </Form>
        )
        } }
      </Formik>
    </>
  );
};

export default ContactotInformation;
