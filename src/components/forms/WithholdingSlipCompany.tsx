import React, { useState, ChangeEvent, FormEvent } from "react";
// import { headerClean, HeadForm, useProductServiceListContext } from "@/contexts/productServiceListContext";
import { 
  Grid2, 
  TextField, 
  InputLabel,
  Select,
  MenuItem,
  Box, 
  Typography, 
  FormControl,
  SelectChangeEvent, } from "@mui/material";
import BaseCard from "../shared/BaseCard";

const WithholdingSlipCompany: React.FC = () => {
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
            บันทึกค่าใช้จ่าย
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
                label="ผู้มีหน้าที่หักภาษี ณ ที่จ่าย"
                variant="outlined"
                name="companyName"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="ที่อยู่"
                variant="outlined"
                name="companyAddress"
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
                label="เบอร์โทรบริษัท"
                variant="outlined"
                name="companyTel"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="ประเภทภาษีเงินได้"
                variant="outlined"
                name="incomeTaxType"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="วันที่ภาษี ที่จ่าย"
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
            <Grid2 size={12}>
              <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">เพิ่มประเภทเงินได้พึ่งประเมินจ่าย</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={statusBorrow}
                    label="เพิ่มประเภทเงินได้พึ่งประเมินจ่าย"
                  >
                    <MenuItem value={"all-status"}>All Status</MenuItem>
                    <MenuItem value={"borrowed"}>Active</MenuItem>
                    <MenuItem value={"returned"}>InActive</MenuItem>
                    <MenuItem value={"damaged"}>Waiting</MenuItem>
                  </Select>
                </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="อื่นๆ"
                variant="outlined"
                name="other"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label-tax">อัตราภาษีที่หัก</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-tax"
                    // value={statusBorrow}
                    label="อัตราภาษีที่หัก"
                  >
                    <MenuItem value={1}>1%</MenuItem>
                    <MenuItem value={3}>3%</MenuItem>
                    <MenuItem value={5}>5%</MenuItem>
                    <MenuItem value={7}>7%</MenuItem>
                    <MenuItem value={9}>9%</MenuItem>
                    <MenuItem value={10}>10%</MenuItem>
                  </Select>
                </FormControl>
            </Grid2>
          </Grid2>
        </Box>
      </BaseCard>
    </>
  );
};

export default WithholdingSlipCompany;
