"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Grid2, TextField, Autocomplete, Box, Typography } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormSection from "../../shared/FormSection";
import { HeadForm, useQuotationListContext } from "@/contexts/QuotationContext";
import debounce from "lodash/debounce";
import { Person } from "@mui/icons-material";

// Validation Schema with Yup
const ContactotInformationSchema = Yup.object({
  contactorName: Yup.string().required("ชื่อผู้ติดต่อจำเป็นต้องกรอก"),
});

interface CustomerOption {
  contactorId: string;
  contactorName: string;
  contactorTel: string | null;
  contactorEmail: string | null;
  contactorAddress: string | null;
}

const ContactotInformation: React.FC = () => {
  const { headForm, setHeadForm } = useQuotationListContext();
  const [suggestions, setSuggestions] = useState<CustomerOption[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch customers for autocomplete
  const fetchSuggestions = async (search: string = "") => {
    setLoading(true);
    try {
      const response = await fetch(`/api/customer?search=${encodeURIComponent(search)}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setSuggestions(data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  const debouncedFetch = useCallback(
    debounce((value: string) => fetchSuggestions(value), 300),
    []
  );

  // Handle select customer from suggestions
  const handleSelectCustomer = (customer: CustomerOption | null, setFieldValue: any) => {
    if (customer) {
      setFieldValue("contactorName", customer.contactorName || "");
      setFieldValue("contactorTel", customer.contactorTel || "");
      setFieldValue("contactorEmail", customer.contactorEmail || "");
      setFieldValue("contactorAddress", customer.contactorAddress || "");
    }
    setSuggestions([]);
  };

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
        {({ touched, errors, values, setFieldValue }) => {
          useEffect(() => {
            setHeadForm(values);
          }, [values, setHeadForm]);

          return (
            <Form>
              <FormSection title="ข้อมูลลูกค้า / ผู้ติดต่อ">
                <Grid2 container spacing={2}>
                  {/* ช่องชื่อผู้ติดต่อ พร้อม Autocomplete */}
                  <Grid2 size={12}>
                    <Autocomplete
                      freeSolo
                      disableClearable={false}
                      options={suggestions}
                      loading={loading}
                      openOnFocus
                      onOpen={() => fetchSuggestions(values.contactorName || "")}
                      inputValue={values.contactorName || ""}
                      onInputChange={(event, newValue, reason) => {
                        if (reason === "input" || reason === "clear") {
                          setFieldValue("contactorName", newValue);
                          if (reason === "input") {
                            debouncedFetch(newValue);
                          }
                        }
                      }}
                      onChange={(event, newValue) => {
                        if (typeof newValue === "object" && newValue !== null) {
                          handleSelectCustomer(newValue, setFieldValue);
                        }
                      }}
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.contactorName || ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.contactorId === value.contactorId
                      }
                      noOptionsText={values.contactorName ? "ไม่พบข้อมูล พิมพ์เพื่อใช้ชื่อผู้ติดต่อนี้" : "พิมพ์เพื่อค้นหาลูกค้า..."}
                      loadingText="กำลังค้นหา..."
                      renderOption={(props, option) => (
                        <Box component="li" {...props} key={option.contactorId}>
                          <Box display="flex" alignItems="center" gap={1.5} py={0.8} width="100%">
                            <Person sx={{ color: "primary.main", fontSize: 24 }} />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1" fontWeight={500} component="div" sx={{ lineHeight: 1.2 }}>
                                {option.contactorName}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1} mt={0.3}>
                                <Typography variant="body2" color="text.secondary">
                                  📞 {option.contactorTel || "ไม่มีเบอร์โทร"}
                                </Typography>
                                {option.contactorEmail && (
                                  <Typography variant="body2" color="text.secondary">
                                    • ✉️ {option.contactorEmail}
                                  </Typography>
                                )}
                              </Box>
                              <Typography
                                variant="caption"
                                color="text.disabled"
                                display="block"
                                sx={{
                                  mt: 0.5,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxWidth: '450px'
                                }}
                              >
                                📍 {option.contactorAddress || "ไม่ระบุที่อยู่"}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="contactorName"
                          label="ชื่อผู้ติดต่อ"
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                          error={touched.contactorName && Boolean(errors.contactorName)}
                          helperText={<ErrorMessage name="contactorName" />}
                          placeholder="พิมพ์เพื่อค้นหาลูกค้าที่เคยบันทึกไว้..."
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      name="contactorTel"
                      label="เบอร์โทร"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.contactorTel || ""}
                      onChange={(e) => setFieldValue("contactorTel", e.target.value)}
                      error={touched.contactorTel && Boolean(errors.contactorTel)}
                      helperText={<ErrorMessage name="contactorTel" />}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      name="contactorEmail"
                      label="อีเมล์"
                      variant="outlined"
                      size="small"
                      type="email"
                      fullWidth
                      value={values.contactorEmail || ""}
                      onChange={(e) => setFieldValue("contactorEmail", e.target.value)}
                      error={touched.contactorEmail && Boolean(errors.contactorEmail)}
                      helperText={<ErrorMessage name="contactorEmail" />}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      name="contactorAddress"
                      label="ที่อยู่"
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      value={values.contactorAddress || ""}
                      onChange={(e) => setFieldValue("contactorAddress", e.target.value)}
                      error={touched.contactorAddress && Boolean(errors.contactorAddress)}
                      helperText={<ErrorMessage name="contactorAddress" />}
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

export default ContactotInformation;
