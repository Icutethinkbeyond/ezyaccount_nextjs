import React, { useState, ChangeEvent, FormEvent } from "react";
import { 
  TextField,
  Box,
  Typography,
  Grid,
  Grid2,} from "@mui/material";
import { headerClean, HeadForm, useProductServiceListContext } from "@/contexts/productServiceListContext";


const HeaderForm: React.FC = () => {

  const { headForm, setHeadForm } = useProductServiceListContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value, type, checked } = e.target;
    setHeadForm({
      ...headForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="Quotation Number"
            variant="outlined"
            name="quotationNumber"
            value={headForm.quotationNumber}
            onChange={handleChange}
            size="small"
            required
            fullWidth
          />
        </Grid2>
      </Grid2>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, mt: 4, textAlign: "left" }}
      >
        ข้อมูลผู้ติดต่อ
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="ชื่อผู้ติดต่อ"
            variant="outlined"
            name="contactorName"
            size="small"
            value={headForm.contactorName}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="เบอร์โทร."
            variant="outlined"
            name="contactorTel"
            size="small"
            value={headForm.contactorTel}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="อีเมล์"
            variant="outlined"
            name="contactorEmail"
            size="small"
            value={headForm.contactorEmail}
            onChange={handleChange}
            required
            type="email"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="ที่อยู่"
            variant="outlined"
            name="contactorAddress"
            size="small"
            value={headForm.contactorAddress}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
          />
        </Grid2>
      </Grid2>

      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, mt: 4, textAlign: "left" }}
      >
        ข้อมูลบริษัท
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="ชื่อบริษัท"
            variant="outlined"
            name="companyName"
            size="small"
            value={headForm.companyName}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="เบอร์โทร."
            variant="outlined"
            name="companyTel"
            size="small"
            value={headForm.companyTel}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="เลขผู้เสียภาษี"
            variant="outlined"
            name="taxId"
            size="small"
            value={headForm.taxId}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="สาขา"
            variant="outlined"
            name="branch"
            size="small"
            value={headForm.branch}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="วันที่"
            variant="outlined"
            name="dateCreate"
            size="small"
            value={headForm.dateCreate}
            onChange={handleChange}
            required
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="ที่อยู่"
            variant="outlined"
            name="companyAddress"
            size="small"
            value={headForm.companyAddress}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
          />
        </Grid2>
      </Grid2>

      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, mt: 4, textAlign: "left" }}
      >
        แนบไฟล์
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            variant="outlined"
            name="companyTel"
            type="file"
            // value={headForm.companyTel}
            // onChange={handleChange}
            required
            disabled
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="หมายเหตุ"
            variant="outlined"
            name="note"
            size="small"
            value={headForm.note}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HeaderForm;
