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
  Button,
  SelectChangeEvent, } from "@mui/material";
import BaseCard from "../../shared/BaseCard";

const AddProductAndService: React.FC = () => {
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
            เพิ่มสินค้า/บริการ
          </Typography>
          <Typography
            style={{ marginBottom: 20 }}
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            กรอกรายละเอียดสินค้า
          </Typography>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <TextField
                  label="ชื่อสินค้าและบริการ"
                  variant="outlined"
                  name="productName"
                  size="small"
                  fullWidth
                />
            </Grid2>
            <Grid2 size={6}>
              <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label-tax">หมวดหมู่สินค้า</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-tax"
                    // value={statusBorrow}
                    label="หมวดหมู่สินค้า"
                  >
                    <MenuItem value={"เลือกหมวดหมู่สินค้า"}>เลือกหมวดหมู่สินค้า</MenuItem>
                    <MenuItem value={"แป้ง"}>แป้ง</MenuItem>
                    <MenuItem value={"อื่นๆ"}>อื่นๆ</MenuItem>
                  </Select>
                </FormControl>
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="จำนวนสินค้าทั้งหมดในสต๊อค"
                variant="outlined"
                name="productQty"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="ค่าใช้จ่ายในการบริการ"
                variant="outlined"
                name="serviceCost"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="ค่าใช้จ่ายทั่วไป"
                variant="outlined"
                name="generalExpense"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="รายละเอียดสินค้า"
                variant="outlined"
                name="productDetail"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="ราคาสินค้า"
                variant="outlined"
                name="productPrice"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="ราคาส่วนลด"
                variant="outlined"
                name="productDiscount"
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <Button
                variant="contained"
                color="success"
                sx={{ marginBottom: "5px" }}
                // onClick={}
              >
                บันทึก
                {/* {!isProductEdit
                  ? "เพิ่มสินค้า"
                  : `Edit ${newProduct.productService}`} */}
              </Button>
              {/* {newProduct.ProductServiceNumber ? ( */}
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginBottom: "5px", ml: 1 }}
                  // onClick={}
                >
                  ยกเลิก
                </Button>
              {/* ) : (
                ""
              )} */}
            </Grid2>
          </Grid2>
        </Box>
      </BaseCard>
    </>
  );
};

export default AddProductAndService;
