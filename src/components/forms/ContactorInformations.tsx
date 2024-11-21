import React, { useState, ChangeEvent, FormEvent } from "react";
// import { headerClean, HeadForm, useProductServiceListContext } from "@/contexts/productServiceListContext";
import { Grid2, TextField, Box, Typography } from "@mui/material";
import BaseCard from "../shared/BaseCard";

const ContactotInformation: React.FC = () => {
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
            MA-Document Details
          </Typography>
          <Typography
            style={{ marginBottom: 20 }}
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            Insert Your MA-Document Details
          </Typography>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                label="Contactor Name"
                variant="outlined"
                name="contactorName"
                size="small"
                required
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Contactor Tel"
                variant="outlined"
                name="contactorTel"
                size="small"
                required
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Contactor Email"
                variant="outlined"
                name="contactorEmail"
                size="small"
                required
                type="email"
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Contactor Address"
                variant="outlined"
                name="contactorAddress"
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

export default ContactotInformation;
