"use client";

import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CardContent,
  MenuItem,
  IconButton,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useRouter } from "next/navigation";
// import BaseCard from "@/components/shared/BaseCard";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const AddUserAndCustomer = () => {
  const router = useRouter();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    branch: "",
    taxNumber: "",
    contactType: "",
    reportType: "",
    date: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("กรุณากรอกชื่อ"),
    email: Yup.string().email("อีเมลไม่ถูกต้อง").required("กรุณากรอกอีเมล"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "กรุณากรอกเบอร์โทรให้ครบ 10 หลัก")
      .required("กรุณากรอกเบอร์โทร"),
    address: Yup.string().required("กรุณากรอกที่อยู่"),
    branch: Yup.string().required("กรุณากรอกข้อมูลสาขา"),
    taxNumber: Yup.string().required("กรุณากรอกเลขที่เสียภาษี"),
    contactType: Yup.string().required("กรุณาเลือกประเภทผู้ติดต่อ"),
    reportType: Yup.string(),
    date: Yup.string(),
  });

  const generateUserID = () => {
    const digits = "0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
      id += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return id;
  };

  const userID = React.useMemo(() => generateUserID(), []);

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form Values:", values);
    console.log("User ID:", userID);
    router.push("/path-to-go-after-submit");
  };

  return (
    <main className="min-h-screen p-24">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h2" gutterBottom>
          เพิ่มผู้ใช้งาน/ลูกค้า
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="รายงานยอดขาย"
            variant="outlined"
            select
            sx={{ width: 200 }}
          >
            <MenuItem value="รายงาน 1">รายงาน 1</MenuItem>
            <MenuItem value="รายงาน 2">รายงาน 2</MenuItem>
          </TextField>
          <TextField
            label="เลือกวันเดือนปี"
            variant="outlined"
            type="date"
            sx={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <IconButton
            sx={{
              color: "black",
              height: "50%",
              width: 30,
            }}
          >
            <RestartAltIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: "100%",
              width: 150,
              fontSize: "1.1rem",
              padding: "10px 20px",
            }}
          >
            ดูรายงาน
          </Button>
        </Box>
      </Box>

      {/* <BaseCard title=""> */}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            ข้อมูลสินค้า/บริการ
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form noValidate autoComplete="off">
                <Box
                  sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: "2fr 1fr",
                    alignItems: "start",
                  }}
                >
                  <Box sx={{ display: "grid", gap: 2 }}>
                    <Field
                      name="name"
                      as={TextField}
                      label="ชื่อ"
                      variant="outlined"
                      fullWidth
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <Field
                      name="address"
                      as={TextField}
                      label="ที่อยู่"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                      }}
                    >
                      <Field
                        name="email"
                        as={TextField}
                        label="อีเมล"
                        variant="outlined"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      <Field
                        name="phone"
                        as={TextField}
                        label="เบอร์โทร"
                        variant="outlined"
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                      }}
                    >
                      <Field
                        name="branch"
                        as={TextField}
                        label="สำนักงานใหญ่/สาขา"
                        variant="outlined"
                        error={touched.branch && Boolean(errors.branch)}
                        helperText={touched.branch && errors.branch}
                      />
                      <Field
                        name="taxNumber"
                        as={TextField}
                        label="เลขที่เสียภาษี"
                        variant="outlined"
                        error={touched.taxNumber && Boolean(errors.taxNumber)}
                        helperText={touched.taxNumber && errors.taxNumber}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1">รหัสผู้ใช้งาน:</Typography>
                    <Box
                      sx={{
                        width: "100%",
                        padding: 1,
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        marginBottom: 2,
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {userID}
                    </Box>
                    <Typography variant="subtitle1">
                      เพิ่มรูปโปรไฟล์:
                    </Typography>
                    <Box
                      sx={{
                        width: 150,
                        height: 150,
                        border: "1px dashed #ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        marginBottom: 2,
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        IMAGE
                      </Typography>
                    </Box>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFieldValue("image", e.target.files[0]);
                        }
                      }}
                      style={{ display: "block" }}
                    />
                    <Field
                      name="contactType"
                      as={TextField}
                      label="ประเภทผู้ติดต่อ"
                      variant="outlined"
                      fullWidth
                      select
                      error={touched.contactType && Boolean(errors.contactType)}
                      helperText={touched.contactType && errors.contactType}
                      sx={{ marginTop: 2 }}
                    >
                      <MenuItem value="ประเภทที่ 1">ประเภทที่ 1</MenuItem>
                      <MenuItem value="ประเภทที่ 2">ประเภทที่ 2</MenuItem>
                    </Field>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right", marginTop: 2 }}>
                  <Button type="submit" variant="contained" color="primary">
                    บันทึกข้อมูล
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      {/* </BaseCard> */}
    </main>
  );
};

export default AddUserAndCustomer;
