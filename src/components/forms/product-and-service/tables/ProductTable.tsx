"use client";

import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import BaseCard from "@/components/shared/BaseCard";
import ConfirmDelete from "@/components/shared/ConfirmDialogCustom";
import { Baseline, Edit, Search } from "lucide-react";
import { Product } from "@/interfaces/Product";
import axios, { AxiosError } from "axios";
import { formatNumber } from "@/utils/utils";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
// import StatusEquipment from "@/components/shared/used/Status";
import { Clear } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  PRODUCT_API_BASE_URL,
  productService,
} from "@/services/api/ProductService";
import APIServices from "@/services/APIServices";
import { useProductContext } from "@/contexts/ProductContext";
import { useNotifyContext } from "@/contexts/NotifyContext";
import CustomToolbar from "@/components/shared/CustomToolbar";
import FloatingButton from "@/components/shared/FloatingButton";

interface Props {}

interface SearchProductFormData {
  equipmentName: string;
  serialNo: string;
  stockStatus: string;
}

const ProductTable: React.FC<Props> = ({}) => {
  const {
      productState,
      setProductState,
      paginationModel,
      setSearchProductForm,
      searchProductForm,
      setPaginationModel,
      rowCount,
      setRowCount,
    } = useProductContext();
    const { setNotify, setOpenBackdrop } = useNotifyContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const localActive = useLocale();
    const router = useRouter();

  const columns: GridColDef<Product>[] = [
    { field: "rowIndex", headerName: "ลำดับ", width: 70 },
        {
          field: "actions",
          headerName: "การจัดการ",
          width: 150,
          sortable: false,
          renderCell: (params) => (
            <>
              {params.row.productName !== "uncategorized" && (
                <>
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={() => handleEdit(params.row)}
                  >
                    <Avatar sx={{ bgcolor: "primary.main", width: 30, height: 30 }}>
                      <Edit size={15} />
                    </Avatar>
                  </IconButton>
                  {/* <ConfirmDelete
                    itemId={params.row.productId}
                    onDelete={handleDeleteProduct}
                    massage={`คุณต้องการลบสินค้า ${params.row.productName} ใช่หรือไม่?`}
                  /> */}
                </>
              )}
            </>
          ),
        },
        { field: "productSKU", headerName: "รหัสสินค้า", width: 200 },
        { field: "productName", headerName: "ชื่อสินค้า", width: 200 },
        { field: "productPrice", headerName: "ราคาสินค้า", width: 100 },
        { field: "productDesc", headerName: "รายละเอียดสินค้า/บริการ", width: 250 },
        // {
        //   field: "equipments",
        //   headerName: "จำนวนสินค้า",
        //   width: 200,
        //   valueGetter: (value, row) => row._count?.equipments,
        // },
      ];
    
      const getData = async () => {
        await APIServices.get(
          `${PRODUCT_API_BASE_URL}?page=${paginationModel.page + 1}&pageSize=${
            paginationModel.pageSize
          }`,
          setProductState,
          setRowCount,
          setIsLoading
        );
      };
    
      const searchData = async () => {
        await APIServices.get(
          `${PRODUCT_API_BASE_URL}/search?page=${
            paginationModel.page + 1
          }&pageSize=${paginationModel.pageSize}&productName=${
            searchProductForm.productName
          }`,
          setProductState,
          setRowCount,
          setIsLoading
        );
      };
    
      const handleDeleteProduct = async (productId: string) => {
        setOpenBackdrop(true);
        const result = await productService.deleteProduct(productId);
        setOpenBackdrop(false);
        setNotify({
          open: true,
          message: result.message,
          color: result.success ? "success" : "error",
        });
      };
    
      const handleEdit = (product: Product) => {
        router.push(
          `/${localActive}/protected/product-and-service/edit?productId=${product.productId}`
        );
      };
    
      const handleClear = () => {
        setSearchProductForm({
          productId: "",
          categoryName: "",
          productName: "",
          productSKU: "",
          productStock: "",
          productBrand: "",
          productPrice: "",
          productDiscountPrice: "",
        });
        getData();
      };
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSearchProductForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchData();
      };
    
      useEffect(() => {
        getData();
      }, [paginationModel]);
    
      //return state
      useEffect(() => {
        setProductState([]);
      }, []);

  return (
    <>
      <FloatingButton
        onClick={() =>
          router.push(
            `/${localActive}/protected/product-and-service/new`
          )
        }
      />
      <BaseCard title="สินค้าทั้งหมด">
        <>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 3 }}>
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  <TextField
                    fullWidth
                    label="ชื่อสินค้า"
                    name="productName"
                    value={searchProductForm.productName}
                    onChange={handleChange}
                    size="small"
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        endAdornment: (
                          <InputAdornment position="start">
                            <Baseline />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid2>

                <Grid2 size={6}>
                  <Button
                    variant="outlined"
                    startIcon={<Clear />}
                    onClick={handleClear}
                    sx={{ minWidth: 100, mr: 1 }}
                  >
                    ล้างฟอร์ม
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Search />}
                    sx={{ minWidth: 100 }}
                    onClick={handleSubmit}
                  >
                    ค้นหา
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          </form>

          <DataGrid
            // getRowId={(row) => row.productId}
            initialState={{
              density: "comfortable",
              pagination: { paginationModel },
              columns: {
                // columnVisibilityModel: {
                //   // Hide columns status and traderName, the other columns will remain visible
                //   traderName: false,
                //   equipments: false,
                // },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            sx={{ border: 0, "--DataGrid-overlayHeight": "300px" }}
            rows={productState}
            columns={columns}
            paginationMode="server"
            rowCount={rowCount}
            onPaginationModelChange={setPaginationModel}
            loading={isLoading}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              toolbar: CustomToolbar,
            }}
          />
        </>
      </BaseCard>
    </>
  );
};

export default ProductTable;
