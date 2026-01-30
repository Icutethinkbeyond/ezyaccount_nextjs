import React, { useEffect, useState, useCallback } from "react";
import { Grid2, TextField, Autocomplete, Box, Typography } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormSection from "../../shared/FormSection";
import { HeadForm, useQuotationListContext } from "@/contexts/QuotationContext";
import { CompanyProfile } from "@/interfaces/Company";
import { Business } from "@mui/icons-material";
import debounce from "lodash/debounce";

// Validation Schema with Yup
const CompanyInformationSchema = Yup.object({
  // companyName: Yup.string().required("ชื่อบริษัทจำเป็นต้องกรอก"),
});

const CompanyInformation: React.FC = () => {
  const { headForm, setHeadForm } = useQuotationListContext();
  const [suggestions, setSuggestions] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch company profiles for autocomplete
  const fetchSuggestions = async (search: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/companies');
      const data = await response.json();
      if (Array.isArray(data)) {
        if (search) {
          const filtered = data.filter((c: CompanyProfile) =>
            c.companyName.toLowerCase().includes(search.toLowerCase()) ||
            c.companyTaxId?.toLowerCase().includes(search.toLowerCase())
          );
          setSuggestions(filtered);
        } else {
          setSuggestions(data);
        }
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

  // Handle select company from suggestions
  const handleSelectCompany = (profile: CompanyProfile | null, setFieldValue: any) => {
    if (profile) {
      setFieldValue("companyName", profile.companyName || "");
      setFieldValue("companyTel", profile.companyPhoneNumber || "");
      setFieldValue("taxId", profile.companyTaxId || "");
      setFieldValue("companyAddress", profile.companyAddress || "");
    }
    setSuggestions([]);
  };

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
        {({ touched, errors, values, setFieldValue }) => {
          useEffect(() => {
            setHeadForm(values);
          }, [values, setHeadForm]);

          return (
            <Form>
              <FormSection title="ข้อมูลบริษัท">
                <Grid2 container spacing={2} mt={5}></Grid2>
                <Grid2 container spacing={2}>
                  {/* Company Name with Autocomplete */}
                  <Grid2 size={12}>
                    <Autocomplete
                      freeSolo
                      options={suggestions}
                      loading={loading}
                      inputValue={values.companyName || ""}
                      onInputChange={(event, newValue, reason) => {
                        if (reason === "input") {
                          setFieldValue("companyName", newValue);
                          debouncedFetch(newValue);
                        }
                      }}
                      onOpen={() => fetchSuggestions(values.companyName || "")}
                      onChange={(event, newValue) => {
                        if (typeof newValue === "object" && newValue !== null) {
                          handleSelectCompany(newValue, setFieldValue);
                        }
                      }}
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.companyName || ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.companyId === value.companyId
                      }
                      noOptionsText={values.companyName ? "ไม่พบข้อมูล พิมพ์เพื่อสร้างใหม่" : "พิมพ์เพื่อค้นหา"}
                      loadingText="กำลังค้นหา..."
                      renderOption={(props, option) => (
                        <Box component="li" {...props} key={option.companyId}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Business sx={{ color: "#33CC99", fontSize: 18 }} />
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {option.companyName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {option.companyTaxId && `Tax: ${option.companyTaxId}`}
                                {option.companyPhoneNumber && ` • Tel: ${option.companyPhoneNumber}`}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="companyName"
                          label="ชื่อบริษัท"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={touched.companyName && Boolean(errors.companyName)}
                          helperText={<ErrorMessage name="companyName" />}
                          placeholder="พิมพ์เพื่อค้นหาบริษัทที่บันทึกไว้..."
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      name="companyTel"
                      label="เบอร์โทร"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.companyTel || ""}
                      onChange={(e) => setFieldValue("companyTel", e.target.value)}
                      error={touched.companyTel && Boolean(errors.companyTel)}
                      helperText={<ErrorMessage name="companyTel" />}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      name="taxId"
                      label="เลขที่เสียภาษี"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.taxId || ""}
                      onChange={(e) => setFieldValue("taxId", e.target.value)}
                      error={touched.taxId && Boolean(errors.taxId)}
                      helperText={<ErrorMessage name="taxId" />}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      name="branch"
                      label="สาขา"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={values.branch || ""}
                      onChange={(e) => setFieldValue("branch", e.target.value)}
                      error={touched.branch && Boolean(errors.branch)}
                      helperText={<ErrorMessage name="branch" />}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      name="dateCreate"
                      label="วันที่สร้าง"
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values.dateCreate || ""}
                      onChange={(e) => setFieldValue("dateCreate", e.target.value)}
                      error={touched.dateCreate && Boolean(errors.dateCreate)}
                      helperText={<ErrorMessage name="dateCreate" />}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      name="companyAddress"
                      label="ที่อยู่"
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      value={values.companyAddress || ""}
                      onChange={(e) => setFieldValue("companyAddress", e.target.value)}
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
