import React, { useState, ChangeEvent, FormEvent } from "react";
import { 
  TextField,
  Box,
  Typography,
  Grid,
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,} from "@mui/material";
import { headerClean, HeadForm, useProductServiceListContext } from "@/contexts/productServiceListContext";
import { toNumber, uniqueId } from "lodash";


const HeaderForm: React.FC = () => {

  const { headForm,footerForm, setHeadForm ,setFooterForm} = useProductServiceListContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value, type, checked } = e.target;
    setHeadForm({
      ...headForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleChangeSelect = (e: SelectChangeEvent<number>) => {
    const { value } = e.target;

    let newValue = toNumber(value);

    if (footerForm.withholdingTax !== newValue) {
      setFooterForm({
        ...footerForm,
        withholdingTax: newValue,
      });
    }
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
        ข้อมูลผู้จำหน่าย
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="ชื่อผู้จำหน่าย"
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
            label="เบอร์โทรบริษัท"
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
            label="เลขที่เสียภาษี"
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
            label="สำนักงาน/สาขา"
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
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              ราคาภาษีที่รวม
            </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={footerForm.withholdingTax}
                  label="ราคาภาษีที่รวม"
                  onChange={handleChangeSelect}
                 >
                    <MenuItem value={"ราคารวมภาษี"}>ราคารวมภาษี</MenuItem>
                    <MenuItem value={"ราคาไม่รวมภาษี"}>ราคาไม่รวมภาษี</MenuItem>
                  </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <TextField
            label="ที่อยู่บริษัท"
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
