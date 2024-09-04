import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  EditNoteTwoTone,
  Delete,
  Edit,
  DeleteSweepTwoTone,
} from "@mui/icons-material";
import BaseCard from "@/components/shared/BaseCard";
import {
  Product,
  SubProduct,
  useProductServiceListContext,
} from "@/contexts/productServiceListContext";

interface TableProps {
  data: any;
}

const ProductsServicesList: React.FC<TableProps> = ({ data }) => {
  const {
    products,
    removeProduct,
    removeSubProduct,
    setProductEdit,
    setSubProductEdit,
    setIsProductEdit,
    setIsSubProductEdit,
  } = useProductServiceListContext();

  const handleRemoveProduct = (productServiceNumber: number) => {
    removeProduct(productServiceNumber);
  };

  const handleRemoveSubProduct = (
    productServiceNumber: number,
    subProductServiceNumber: number
  ) => {
    removeSubProduct(productServiceNumber, subProductServiceNumber);
  };

  const handleEditProduct = (product: Product) => {
    setProductEdit(product);
    setIsProductEdit(true);
  };

  const handleEditSubProduct = (subProduct: SubProduct) => {
    setSubProductEdit(subProduct);
    setIsSubProductEdit(true);
  };

  return (
    <BaseCard title="Product/Service Items">
      <TableContainer
        sx={{
          width: {
            xs: "254px",
            sm: "100%",
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  #Order.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Product/Service
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Discount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Total
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Edit
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Remove
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <>
                <TableRow key={product.productServiceNumber}>
                  <TableCell>{product.productServiceNumber}</TableCell>
                  <TableCell>{product.productService}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell align="right">
                    {product.price === 0 ? "" : product.price}
                  </TableCell>
                  <TableCell align="right">
                    {product.amount === 0 ? "" : product.amount}
                  </TableCell>
                  <TableCell align="right">
                    {product.discount === 0 ? "" : product.discount}
                  </TableCell>
                  <TableCell align="right">
                    {product.total === 0 ? "" : product.total}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditProduct(product)}
                    >
                      <EditNoteTwoTone />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        handleRemoveProduct(product.productServiceNumber)
                      }
                    >
                      <DeleteSweepTwoTone />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {product.subProductList.map((subProduct) => (
                  <TableRow key={subProduct.subProductServiceNumber}>
                    <TableCell style={{ paddingLeft: 34 }}>
                      {subProduct.subProductServiceNumber}
                    </TableCell>
                    <TableCell>{subProduct.productService}</TableCell>
                    <TableCell>{subProduct.description}</TableCell>
                    <TableCell align="right">{subProduct.price}</TableCell>
                    <TableCell align="right">{subProduct.amount}</TableCell>

                    <TableCell align="right">{subProduct.discount}</TableCell>
                    <TableCell align="right">{subProduct.total}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditSubProduct(subProduct)}
                      >
                        <EditNoteTwoTone />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          handleRemoveSubProduct(
                            product.productServiceNumber,
                            subProduct.subProductServiceNumber
                          )
                        }
                      >
                        <DeleteSweepTwoTone />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  key={product.productServiceNumber + 1}
                  sx={{ backgroundColor: "#FCF0ED" }}
                >
                  <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontWeight: 700 }}>Total Due</Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/* <Typography sx={{ fontWeight: 500 }}>
                      {product.totalPrice}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    {/* <Typography sx={{ fontWeight: 500 }}>
                      {product.totalAmount}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    {/* <Typography sx={{ fontWeight: 500 }}>
                      {product.totalDiscount}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontWeight: 500 }}>
                      {product.sumTotal}
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default ProductsServicesList;
