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
  useProductServiceListContext,
} from "@/contexts/productServiceListContext";
import { SubProduct, Product } from "@/contexts/productServiceListContext";
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
  } = useProductServiceListContext();

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
      <Box title="Product/Service Items">
        <Box p={3} border="1px solid #ccc" borderRadius="8px" mb={2}>
          <Typography variant="h6" gutterBottom>
            Item
          </Typography>
          <Typography
            style={{ marginBottom: 20 }}
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            Insert Your MA-Document Details
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                label="#Order"
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
                label="Product/Service"
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
                label="Description"
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
                label="Price"
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
                label="Amount"
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
                label="Discount"
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
                label="Total"
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
                  ? "Add Item"
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
            Sub-Item
          </Typography>
          <Typography
            style={{ marginBottom: 20 }}
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            Insert Your MA-Document Details
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} lg={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="product-select-label">
                  Product/Service
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
                label="#Order"
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
                label="Subject"
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
                label="Description"
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
                label="Price"
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
                label="Amount"
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
                label="Discount"
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
                label="Total"
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
                  ? "Add Sub-Item"
                  : `Edit ${newSubProduct.productService}`}
              </Button>
              {newSubProduct.subProductServiceNumber ? (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginBottom: "5px", ml: 1 }}
                  onClick={() => unEditSubProduct()}
                >
                  Cancel The Edit
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
