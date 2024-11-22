import React, { useState, ChangeEvent, FormEvent } from "react";
// import { headerClean, HeadForm, useProductServiceListContext } from "@/contexts/productServiceListContext";
import { Grid2, TextField, Box, Typography } from "@mui/material";
import BaseCard from "../shared/BaseCard";

const WithholdingSlipTaxPayer: React.FC = () => {
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
               ผู้มีหน้าที่หักภาษี ณ ที่จ่าย
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
            <Grid2 size={12}>
              <TextField
                label="ชื่อ"
                variant="outlined"
                name="payerName"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="ที่อยู่"
                variant="outlined"
                name="payerAddress"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="เลขที่เสียภาษี"
                variant="outlined"
                name="taxId"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="เบอร์โทรลูกค้า"
                variant="outlined"
                name="payerTel"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="เลขที่บัญชีนายจ้าง"
                variant="outlined"
                name="taxId"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="วันที่สร้าง"
                variant="outlined"
                name="dateCreate"
                size="small"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="เงินที่จ่ายเข้า"
                variant="outlined"
                name="moneyPayIn"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="ใบอนุญาตเลขที่"
                variant="outlined"
                name="approveNumber"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="ผู้จ่ายเงิน"
                variant="outlined"
                name="payer"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="อื่นๆ"
                variant="outlined"
                name="payerOther"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="จำนวนเงินที่จ่าย"
                variant="outlined"
                name="deducted"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="ภาษีที่หัก และนำส่งไว้"
                variant="outlined"
                name="tax"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="กรุณาเลือกผู้จ่ายภาษี"
                variant="outlined"
                name="taxPayer"
                size="small"
                required
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="จำนวนเงินที่จ่ายหลังหักภาษี"
                variant="outlined"
                name="total"
                size="small"
                fullWidth
              />
            </Grid2>
          </Grid2>
        </Box>
      </BaseCard>
    </>
  );
};

export default WithholdingSlipTaxPayer;
