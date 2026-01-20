import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Typography,
  Grid2,
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

interface NewProductProps {
  isEdit?: boolean | null | undefined;
}

const NewProductItem: React.FC<NewProductProps> = ({ isEdit = false }) => {
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

  // Auto-select first product when products change
  useEffect(() => {
    if (products.length > 0 && newSubProduct.productServiceKey === 0) {
      const firstProduct = products.find(p => p.isSubjectItem);
      if (firstProduct) {
        setnewSubProduct({
          ...newSubProduct,
          productServiceKey: firstProduct.productServiceNumber,
        });
      }
    }
  }, [products]);

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
    setIsSubProductEdit(false);
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
    <Box title="Product/Service Items">
      <Box component="form" noValidate autoComplete="off">
        <Typography
          variant="h5"
          component="h2"
          sx={{ mb: 2, mt: 4, textAlign: "left" }}
        >
          เพิ่มสินค้าหลัก
        </Typography>
        <Grid2 container spacing={2} sx={{ mb: 4 }}>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField
              label="รายละเอียด"
              variant="outlined"
              name="description"
              size="small"
              value={newProduct.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField
              label="ราคารวม"
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
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
            <Button
              variant="contained"
              color="success"
              sx={{ marginBottom: "5px" }}
              onClick={() => !isProductEdit ? addItem() : handleEditProduct()}
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
                ยกเลิกแก้ไข
              </Button>
            ) : (
              ""
            )}
          </Grid2>
        </Grid2>
      </Box>

      <Box component="form" noValidate autoComplete="off">
        <Typography
          variant="h5"
          component="h2"
          sx={{ mb: 2, mt: 4, textAlign: "left" }}
        >
          เพิ่มสินค้าย่อย
        </Typography>
        <Grid2 container spacing={2} sx={{ mb: 4 }}>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="product-select-label">สินค้า/บริการ</InputLabel>
              <Select
                labelId="product-select-label"
                id="product-select"
                value={newSubProduct.productServiceKey}
                onChange={handleChangeSelect}
                label="Select Product"
              >
                {products.map((product: any) => (
                  <MenuItem
                    key={product.productServiceNumber}
                    value={product.productServiceNumber}
                  >
                    {product.productService}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField
              label="รายละเอียด"
              variant="outlined"
              name="description"
              size="small"
              value={newSubProduct.description}
              onChange={handleChangeSubProduct}
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField
              label="ราคารวม"
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
            <Button
              variant="contained"
              color="success"
              sx={{ marginBottom: "5px" }}
              onClick={() => !isSubProductEdit ? addSubItem() : handleEditSubProduct()}
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
                ยกเลิกแก้ไข
              </Button>
            ) : (
              ""
            )}
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default NewProductItem;
