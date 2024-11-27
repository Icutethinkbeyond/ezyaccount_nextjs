import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import {
  EditNoteTwoTone,
  DeleteSweepTwoTone,
} from "@mui/icons-material";
import BaseCard from "@/components/shared/BaseCard";
import {
  Product,
  SubProduct,
  useProductServiceListContext,
} from "@/contexts/productServiceListContext";
import { formatNumber } from "@/utils/utils";

interface TableProps {
  // data: any;
}

const ProductsServicesList: React.FC<TableProps> = () => {
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
    <BaseCard title="รายการ สินค้า/บริการ">
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
                  #ลำดับ.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  สินค้า/บริการ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  รายละเอียด
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  จำนวน
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  ราคา
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  ส่วนลด
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  ราคารวม
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  แก้ไข
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  ลบ
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
                    {product.price === 0 ? "" : formatNumber(product.price)}
                  </TableCell>
                  <TableCell align="right">
                    {product.amount === 0 ? "" : formatNumber(product.amount)}
                  </TableCell>
                  <TableCell align="right">
                    {product.discount === 0 ? "" : formatNumber(product.discount)}
                  </TableCell>
                  <TableCell align="right">
                    {product.total === 0 ? "" : formatNumber(product.total)}
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
                    <TableCell align="right">{formatNumber(subProduct.price)}</TableCell>
                    <TableCell align="right">{formatNumber(subProduct.amount)}</TableCell>

                    <TableCell align="right">{formatNumber(subProduct.discount)}</TableCell>
                    <TableCell align="right">{formatNumber(subProduct.total)}</TableCell>
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
