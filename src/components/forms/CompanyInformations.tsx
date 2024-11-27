import React, { useState, ChangeEvent, FormEvent } from "react";
// import { headerClean, HeadForm, useProductServiceListContext } from "@/contexts/productServiceListContext";
import { Grid2, TextField, Box, Typography } from "@mui/material";
import BaseCard from "../shared/BaseCard";

const CompanyInformation: React.FC = () => {
  //   const { headForm, setHeadForm } = useProductServiceListContext();

  //   const handleChange = (
  //     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  //   ) => {
  //     const { name, value, type, checked } = e.target;
  //     setHeadForm({
  //       ...headForm,
  //       [name]: type === "checkbox" ? checked : value,
  //     });
  //   };

  return (
    <>
      {/* <Typography variant="h6" gutterBottom>
        Company Details
      </Typography>
      <Typography
        style={{ marginBottom: 20 }}
        variant="body2"
        color="text.secondary"
        gutterBottom
      >
        Insert Your Company Details
      </Typography> */}
      <BaseCard>
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
              <TextField
                label="ชื่อบริษัท"
                variant="outlined"
                name="companyName"
                size="small"
                required
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="เบอร์โทร"
                variant="outlined"
                name="companyTel"
                size="small"
                required
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="เลขที่เสียภาษี"
                variant="outlined"
                name="taxId"
                size="small"
                required
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="สาขา"
                variant="outlined"
                name="branch"
                size="small"
                required
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="วันที่สร้าง"
                variant="outlined"
                name="dateCreate"
                size="small"
                required
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="ที่อยู่"
                variant="outlined"
                name="companyAddress"
                size="small"
                required
                fullWidth
                multiline
                rows={3}
              />
            </Grid2>
          </Grid2>
        </Box>
      </BaseCard>
    </>
  );
};

export default CompanyInformation;
