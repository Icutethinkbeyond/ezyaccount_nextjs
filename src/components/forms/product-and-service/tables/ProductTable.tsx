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
import { Button, Grid2, Typography } from "@mui/material";
import BaseCard from "@/components/shared/BaseCard";
import ConfirmDelete from "@/components/shared/ConfirmDialogCustom";
import { CirclePlus } from "lucide-react";
import { Product } from "@/interfaces/Product";
import axios, { AxiosError } from "axios";
import { formatNumber } from "@/utils/utils";
// import StatusEquipment from "@/components/shared/used/Status";
import { Clear } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useProductContext } from "@/contexts/ProductContext";
import { useNotifyContext } from "@/contexts/NotifyContext";

interface Props {}

interface SearchFormData {
  equipmentName: string;
  serialNo: string;
  stockStatus: string;
}

const ProductTable: React.FC<Props> = ({}) => {
  const {} = useProductContext();
  const { setNotify, setOpenBackdrop, openBackdrop } = useNotifyContext();

  const router = useRouter();
  const localActive = useLocale();

  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<SearchFormData>({
    equipmentName: "",
    serialNo: "",
    stockStatus: "",
  });
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const columns: GridColDef<Product>[] = [
    { field: "rowIndex", headerName: "ลำดับ", width: 70 },
    {
      field: "actions",
      headerName: "การจัดการ",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          {/* <IconButton
            size="small"
            color="secondary"
            onClick={() => handleEdit(params.row)}
          >
            <Avatar sx={{ bgcolor: "primary.main", width: 30, height: 30 }}>
              <Edit size={15} />
            </Avatar>
          </IconButton> */}
          {/* <ConfirmDelete
            dialogTitle="ยืนยันการลบ?"
            itemId={params.row.equipmentId}
            onDelete={handleDeleteItem}
            onDisable={
              params.row.aboutEquipment?.stockStatus ===
                EquipmentStatus.CurrentlyRenting ||
              params.row.aboutEquipment?.stockStatus === EquipmentStatus.InActive ||
              params.row.aboutEquipment?.stockStatus === EquipmentStatus.Damaged
            }
            massage={`คุณต้องการลบอุปกรณ์ ${params.row.equipmentName} ใช่หรือไม่?`}
          /> */}
        </>
      ),
    },
    { field: "serialNo", headerName: "SerialNo.", width: 150 },
    {
      field: "equipmentName",
      headerName: "ชื่ออุปกรณ์",
      width: 300,
      renderCell: (params) => <b> {params.row.productName} </b>,
    },
    { field: "brand", headerName: "แบรนด์", width: 150 },
    { field: "description", headerName: "รายละเอียด", width: 200 },
    { field: "remark", headerName: "บันทึกเพิ่มเติม", width: 200 },
    {
      field: "categoryName",
      headerName: "หมวดหมู่",
      width: 200,
      valueGetter: (value, row) => row.category?.categoryName,
    },
    {
      field: "RentalPriceCurrent",
      headerName: "ราคา",
      width: 150,
      valueGetter: (value, row) => formatNumber(row.aboutProduct?.productPrice),
    },
    // {
    //   field: "stockStatus",
    //   headerName: "สถานะ",
    //   width: 150,
    //   // valueGetter: (value, row) => row.aboutEquipment?.stockStatus,
    //   renderCell: (params) => (
    //     <>
    //       <StatusEquipment status={params.row.aboutEquipment?.stockStatus} />
    //     </>
    //   ),
    // },
  ];

  function CustomToolbar() {
    return (
      <>
        <Grid2 container mb={3}>
          <Grid2 size={6}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<CirclePlus />}
              sx={{ minWidth: 100 }}
              onClick={handleNew}
            >
              เพิ่มอุปกรณ์
            </Button>
          </Grid2>
          <Grid2 size={6} justifyItems={"flex-end"}>
            <GridToolbarContainer>
              {/* ปรับปุ่ม Columns ให้เป็น outlined */}
              <GridToolbarColumnsButton
                slotProps={{
                  button: { variant: "outlined" },
                }}
              />

              {/* ปรับปุ่ม Filter ให้เป็น outlined
              <GridToolbarFilterButton
                slotProps={{
                  button: { variant: "outlined" },
                }}
              /> */}

              {/* ปรับปุ่ม Density ให้เป็น outlined */}
              <GridToolbarDensitySelector
                slotProps={{
                  button: { variant: "outlined" },
                  tooltip: { title: "Change density" },
                }}
              />
            </GridToolbarContainer>
          </Grid2>
        </Grid2>
      </>
    );
  }

  const handleNew = () => {
    router.push(`/${localActive}/protected/product-and-service/new`);
  };

  const handleDeleteItem = (equipmentId: string) => {
    axios
      .delete(`/api/equipment?equipmentId=${equipmentId}`)
      .then((data) => {
        setNotify({
          open: true,
          message: `ระบบได้ลบ ${data.data.equipmentName} เเล้ว`,
          color: "success",
        });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request cancelled");
        } else {
          console.error("Fetch error:", error);
          setNotify({
            open: true,
            message: error.message,
            color: "error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
        getData();
      });
  };

  const handleEdit = (equipmentId: string) => {
    router.push(
      `/${localActive}/protected/inventory/edit/?equipmentId=${equipmentId}`
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      equipmentName: "",
      serialNo: "",
      stockStatus: "",
    });
    getData();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchData();
  };

  const searchData = async () => {
    // try {
    //   await fetchData(
    //     `/api/equipment/search?page=${paginationModel.page + 1}&pageSize=${
    //       paginationModel.pageSize
    //     }&serialNo=${formData.serialNo}&equipmentName=${
    //       formData.equipmentName
    //     }&stockStatus=${formData.stockStatus}`,
    //     setEquipments,
    //     setRowCount,
    //     setLoading
    //   );
    // } catch (error: any) {
    //   if (error.message !== "Request was canceled") {
    //     console.error("Unhandled error:", error);
    //   }
    // }
  };

  const getData = async () => {
    // try {
    //   await fetchData(
    //     `/api/equipment?page=${paginationModel.page + 1}&pageSize=${
    //       paginationModel.pageSize
    //     }`,
    //     setEquipments,
    //     setRowCount,
    //     setLoading
    //   );
    // } catch (error: any) {
    //   if (error.message !== "Request was canceled") {
    //     console.error("Unhandled error:", error);
    //   }
    // }
  };

  // useEffect(() => {
  //   getData();
  //   return () => {
  //     setEquipments([]);
  //   };
  // }, [paginationModel, recall]);

  return (
    <>
      <Typography variant="h4" mt={2}>
        อปุกรณ์ทั้งหมด
      </Typography>
      {/* <form onSubmit={handleSubmit}>
        <Box sx={{ display: "grid", gap: 3 }} mb={4} mt={4}>
          <Grid2 container spacing={2} >
            <Grid2 size={3}>
              <TextField
                fullWidth
                label="S/N"
                name="serialNo"
                value={formData.serialNo}
                onChange={handleChange}
                size="small"
                sx={{ background: "#ffffff" }}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        <Barcode />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                fullWidth
                label="ชื่ออุปกรณ์"
                name="equipmentName"
                value={formData.equipmentName}
                onChange={handleChange}
                size="small"
                sx={{ background: "#ffffff" }}
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
            <Grid2 size={3}>
              <TextField
                select
                fullWidth
                label="สถานะอุปกรณ์"
                name="stockStatus"
                size="small"
                value={formData.stockStatus}
                onChange={handleChange}
                sx={{ background: "#ffffff" }}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              >
                {Object.values(EquipmentStatus).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={3}>
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
      </form> */}
      <BaseCard>
        <>
          {/* <DataGrid
            getRowId={(row) => row.equipmentId}
            initialState={{
              density: "comfortable",
              pagination: { paginationModel },
              columns: {
                columnVisibilityModel: {
                  // Hide columns status and traderName, the other columns will remain visible
                  equipmentRemark: false,
                  brand: false,
                  description: false,
                  remark: false,
                  categoryName: false,
                  equipmentType: false,
                  purchaseDate: false,
                  unitName: false,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            sx={{ border: 0, "--DataGrid-overlayHeight": "300px" }}
            rows={equipments}
            columns={columns}
            paginationMode="server"
            rowCount={rowCount}
            onPaginationModelChange={setPaginationModel}
            loading={loading}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              toolbar: CustomToolbar,
            }}
          /> */}
        </>
      </BaseCard>
    </>
  );
};

export default ProductTable;
