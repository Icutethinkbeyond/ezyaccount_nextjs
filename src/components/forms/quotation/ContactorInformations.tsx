import React, { useEffect } from "react";
import { Grid2, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormSection from "../../shared/FormSection";
import { HeadForm, useQuotationListContext } from "@/contexts/QuotationContext";

// Validation Schema with Yup
const ContactotInformationSchema = Yup.object({
  contactorName: Yup.string().required("ชื่อผู้ติดต่อจำเป็นต้องกรอก"),
});

const ContactotInformation: React.FC = () => {

  const { headForm, setHeadForm } = useQuotationListContext();

  // useEffect(() => {
  //   console.log(headForm)
  // }, [headForm])

  return (
    <>
      <Formik<HeadForm>
        initialValues={headForm}
        validationSchema={ContactotInformationSchema}
        enableReinitialize
        onSubmit={(values) => {
          setHeadForm(values);
        }}
      >
        {({ touched, errors, values }) => {

          useEffect(() => {
            setHeadForm(values);
          }, [values, setHeadForm]);

          return (
            <Form>
              <FormSection title="ข้อมูลลูกค้า">
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
              </FormSection>
            </Form>
          )
        }}
      </Formik>
    </>
  );
};

export default ContactotInformation;
