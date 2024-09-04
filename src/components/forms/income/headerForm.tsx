import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

interface FormData {
  quotationNumber: string;
  companyName: string;
  companyTel: string;
  contactorName: string;
  contactorTel: string;
  companyAddress: string;
  contactorAddress: string;
  contactorEmail: string;
  taxId: string;
  branch: string;
  dateCreate: string;
  includeTax: boolean;
  note: string;
}

const HeaderForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    quotationNumber: "",
    companyName: "",
    companyTel: "",
    contactorName: "",
    contactorTel: "",
    companyAddress: "",
    contactorAddress: "",
    contactorEmail: "",
    taxId: "",
    branch: "",
    dateCreate: "",
    includeTax: false,
    note: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Handle form submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Quotation Number"
            variant="outlined"
            name="quotationNumber"
            value={formData.quotationNumber}
            onChange={handleChange}
            size="small"
            required
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12} sm={6} lg={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.includeTax}
                onChange={handleChange}
                name="includeTax"
              />
            }
            label="Include Tax"
          />
        </Grid> */}
      </Grid>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, mt: 4, textAlign: "left" }}
      >
        Contactor Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Contactor Name"
            variant="outlined"
            name="contactorName"
            size="small"
            value={formData.contactorName}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Contactor Tel"
            variant="outlined"
            name="contactorTel"
            size="small"
            value={formData.contactorTel}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Contactor Email"
            variant="outlined"
            name="contactorEmail"
            size="small"
            value={formData.contactorEmail}
            onChange={handleChange}
            required
            type="email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Contactor Address"
            variant="outlined"
            name="contactorAddress"
            size="small"
            value={formData.contactorAddress}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, mt: 4, textAlign: "left" }}
      >
        Company Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Company Name"
            variant="outlined"
            name="companyName"
            size="small"
            value={formData.companyName}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Company Tel"
            variant="outlined"
            name="companyTel"
            size="small"
            value={formData.companyTel}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Taxpayer Identification No"
            variant="outlined"
            name="taxId"
            size="small"
            value={formData.taxId}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Branch"
            variant="outlined"
            name="branch"
            size="small"
            value={formData.branch}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Date Create"
            variant="outlined"
            name="dateCreate"
            size="small"
            value={formData.dateCreate}
            onChange={handleChange}
            required
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Company Address"
            variant="outlined"
            name="companyAddress"
            size="small"
            value={formData.companyAddress}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, mt: 4, textAlign: "left" }}
      >
        Document Footer
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            variant="outlined"
            name="companyTel"
            type="file"
            value={formData.companyTel}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label="Note"
            variant="outlined"
            name="note"
            size="small"
            value={formData.note}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderForm;
