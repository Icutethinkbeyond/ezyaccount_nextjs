import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import {
  productClean,
  subProductClean,
  useQuotationListContext,
} from "@/contexts/QuotationContext";
import { SubProduct, Product } from "@/contexts/QuotationContext";
import { toNumber } from "lodash";
import BaseCard from "../shared/BaseCard";

interface NewProductProps {
  isEdit?: boolean | null | undefined;
}

const NewItems: React.FC<NewProductProps> = ({ isEdit = false }) => {
  const {
    products,
    addProduct,
    addSubProduct,
    productEdit,
    subProductEdit,
    setProductEdit,
    setSubProductEdit,
    isSubProductEdit,
    isProductEdit,
    setIsProductEdit,
    setIsSubProductEdit,
    updateProduct,
    updateSubProduct,
  } = useQuotationListContext();

  useEffect(() => {
    setnewProduct(productEdit);
  }, [productEdit]);

  useEffect(() => {
    setnewSubProduct(subProductEdit);
  }, [subProductEdit]);

  const [newProduct, setnewProduct] = useState<Product>(productClean);
  const [newSubProduct, setnewSubProduct] =
    useState<SubProduct>(subProductClean);

  useEffect(() => {
    let sum = newProduct.price * newProduct.amount - newProduct.discount;
    if (newProduct.total !== sum) {
      setnewProduct({
        ...newProduct,
        total: sum,
      });
    }
  }, [newProduct]);

  useEffect(() => {
    let sum =
      newSubProduct.price * newSubProduct.amount - newSubProduct.discount;
    if (newSubProduct.total !== sum) {
      setnewSubProduct({
        ...newSubProduct,
        total: sum,
      });
    }
  }, [newSubProduct]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the value is a number and the name indicates a numeric field
    const numericFields = ["amount", "price", "discount", "total"];
    const parsedValue = numericFields.includes(name) ? Number(value) : value;

    setnewProduct({
      ...newProduct,
      [name]: parsedValue,
    });
  };

  const handleChangeSelect = (e: SelectChangeEvent<number>) => {
    const { value } = e.target;

    let newValue = toNumber(value);

    setnewSubProduct({
      ...newSubProduct,
      productServiceKey: newValue,
    });
  };

  const handleChangeSubProduct = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the value is a number and the name indicates a numeric field
    const numericFields = ["amount", "price", "discount", "total"];
    const parsedValue = numericFields.includes(name) ? Number(value) : value;

    setnewSubProduct({
      ...newSubProduct,
      [name]: parsedValue,
    });
  };

  const addItem = () => {
    addProduct(newProduct);
    setnewProduct(productClean);
    setIsProductEdit(false);
  };

  const addSubItem = () => {
    addSubProduct(newSubProduct.productServiceKey, newSubProduct);
    setnewSubProduct(subProductClean);
    setIsProductEdit(false);
  };

  const unEditProduct = () => {
    setProductEdit(productClean);
    setnewProduct(productClean);
    setIsProductEdit(false);
  };

  const unEditSubProduct = () => {
    setSubProductEdit(subProductClean);
    setnewSubProduct(subProductClean);
    setIsSubProductEdit(false);
  };

  const handleEditProduct = () => {
    setnewProduct(productClean);
    updateProduct(newProduct);
    setIsProductEdit(false);
  };

  const handleEditSubProduct = () => {
    setnewSubProduct(subProductClean);
    updateSubProduct(newSubProduct.productServiceKey, newSubProduct);
    setIsSubProductEdit(false);
  };

  return (
    <BaseCard>
      <Box title="รายการสินค้า/บริการ">
        <Box p={3} border="1px solid #ccc" borderRadius="8px" mb={2}>
          <Typography variant="h6" gutterBottom>
            สินค้า
          </Typography>
          <Typography
            style={{ marginBottom: 20 }}
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            กรอกข้อมูลให้ครบถ้วน
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="#ลำดับ"
                variant="outlined"
                name="productServiceNumber"
                size="small"
                type="number"
                required
                value={newProduct.productServiceNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="สินค้า/บริการ"
                variant="outlined"
                name="productService"
                size="small"
                required
                value={newProduct.productService}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="รายละเอียด"
                variant="outlined"
                name="description"
                size="small"
                value={newProduct.description}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="ราคา"
                variant="outlined"
                name="price"
                size="small"
                type="number"
                value={newProduct.price}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="จำนวน"
                variant="outlined"
                name="amount"
                size="small"
                type="number"
                required
                value={newProduct.amount}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="ส่วนลด"
                variant="outlined"
                name="discount"
                size="small"
                type="number"
                required
                value={newProduct.discount}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="รวม"
                variant="outlined"
                name="total"
                size="small"
                type="number"
                required
                disabled
                value={newProduct.total}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <Button
                variant="contained"
                color="success"
                sx={{ marginBottom: "5px" }}
                onClick={() => (!isEdit ? addItem() : handleEditProduct())}
              >
                {!isProductEdit
                  ? "เพิ่มสินค้า"
                  : `Edit ${newProduct.productService}`}
              </Button>
              {newProduct.productServiceNumber ? (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginBottom: "5px", ml: 1 }}
                  onClick={() => unEditProduct()}
                >
                  Cancel The Edit
                </Button>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Box>

        <Box p={3} border="1px solid #ccc" borderRadius="8px">
          <Typography variant="h6" gutterBottom>
            สินค้าย่อย
          </Typography>
          <Typography
            style={{ marginBottom: 20 }}
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            กรอกข้อมูลให้ครบถ้วน
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} lg={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="product-select-label">
                  เลือกสินค้า/บริการหลัก
                </InputLabel>
                <Select
                  labelId="product-select-label"
                  id="product-select"
                  value={newSubProduct.productServiceKey}
                  onChange={handleChangeSelect}
                  label="Select Product"
                >
                  {products.map((product) => (
                    <MenuItem
                      key={product.productServiceNumber}
                      value={product.productServiceNumber}
                    >
                      {product.productService}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="#ลำดับ"
                variant="outlined"
                name="subProductServiceNumber"
                size="small"
                required
                value={newSubProduct.subProductServiceNumber}
                onChange={handleChangeSubProduct}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="สินค้า/บริการย่อย"
                variant="outlined"
                name="productService"
                size="small"
                required
                value={newSubProduct.productService}
                onChange={handleChangeSubProduct}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="รายละเอียด"
                variant="outlined"
                name="description"
                size="small"
                value={newSubProduct.description}
                onChange={handleChangeSubProduct}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="ราคา"
                variant="outlined"
                name="price"
                size="small"
                type="number"
                value={newSubProduct.price}
                onChange={handleChangeSubProduct}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="จำนวน"
                variant="outlined"
                name="amount"
                size="small"
                type="number"
                value={newSubProduct.amount}
                onChange={handleChangeSubProduct}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="ส่วนลด"
                variant="outlined"
                name="discount"
                size="small"
                type="number"
                value={newSubProduct.discount}
                onChange={handleChangeSubProduct}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="ยอดรวม"
                variant="outlined"
                name="total"
                size="small"
                type="number"
                disabled
                value={newSubProduct.total}
                onChange={handleChangeSubProduct}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Button
                variant="contained"
                color="success"
                sx={{ marginBottom: "5px" }}
                onClick={() =>
                  !isEdit ? addSubItem() : handleEditSubProduct()
                }
              >
                {!isSubProductEdit
                  ? "เพิ่มสินค้าย่อย"
                  : `Edit ${newSubProduct.productService}`}
              </Button>
              {newSubProduct.subProductServiceNumber ? (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginBottom: "5px", ml: 1 }}
                  onClick={() => unEditSubProduct()}
                >
                  ยกเลิกการแก้ไข
                </Button>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </BaseCard>
  );
};

export default NewItems;
