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
import { Category } from "@/interfaces/Product";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
// import StatusEquipment from "@/components/shared/used/Status";
import { Clear } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  CATEGORY_API_BASE_URL,
  categoryService,
} from "@/services/api/ProductService";
import APIServices from "@/services/APIServices";
import { useProductContext } from "@/contexts/ProductContext";
import { useNotifyContext } from "@/contexts/NotifyContext";
import CustomToolbar from "@/components/shared/CustomToolbar";
import FloatingButton from "@/components/shared/FloatingButton";

interface Props {}

interface SearchFormData {
  equipmentName: string;
  serialNo: string;
  stockStatus: string;
}

const CategoryTable: React.FC<Props> = ({}) => {
  const {
      categoryState,
      setCategoryState,
      paginationModel,
      setSearchForm,
      searchForm,
      setPaginationModel,
      rowCount,
      setRowCount,
    } = useProductContext();
    const { setNotify, setOpenBackdrop } = useNotifyContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const localActive = useLocale();
    const router = useRouter();

  const columns: GridColDef<Category>[] = [
    { field: "rowIndex", headerName: "ลำดับ", width: 70 },
    {
      field: "actions",
      headerName: "การจัดการ",
      width: 200,
      sortable: false,
      renderCell: (params) => (
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
          <ConfirmDelete
            isIconButton={true}
            itemId={params.row.categoryId}
            onDelete={handleDeleteCategory}
            massage={`คุณต้องการลบหมวดหมู่ ${params.row.categoryName} ใช่หรือไม่?`}
          />
        </>
      ),
    },
    { field: "categoryName", headerName: "ชื่อหมวดหมู่", width: 300 },
    { field: "categoryDesc", headerName: "รายละเอียดหมวดหมู่", width: 250 },
    {
      field: "equipments",
      headerName: "จำนวนสินค้า",
      width: 200,
      valueGetter: (value, row) => row._count?.equipments,
    },
  ];

  const getData = async () => {
    await APIServices.get(
      `${CATEGORY_API_BASE_URL}?page=${paginationModel.page + 1}&pageSize=${
        paginationModel.pageSize
      }`,
      setCategoryState,
      setRowCount,
      setIsLoading
    );
  };

  const searchData = async () => {
    await APIServices.get(
      `${CATEGORY_API_BASE_URL}/search?page=${
        paginationModel.page + 1
      }&pageSize=${paginationModel.pageSize}&categoryName=${
        searchForm.categoryName
      }`,
      setCategoryState,
      setRowCount,
      setIsLoading
    );
  };

  const handleDeleteCategory = async (categoryId: string) => {
    setOpenBackdrop(true);
    const result = await categoryService.deleteCategory(categoryId);
    setOpenBackdrop(false);
    setNotify({
      open: true,
      message: result.message,
      color: result.success ? "success" : "error",
    });
    if (result.success) {
      getData();
    }
  };

  const handleEdit = (category: Category) => {
    router.push(
      `/${localActive}/protected/product-and-service/category/edit?categoryId=${category.categoryId}`
    );
  };

  const handleClear = () => {
    setSearchForm({
      categoryName: "",
    });
    getData();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchForm((prev) => ({
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
    setCategoryState([]);
  }, []);

  return (
    <>
      <FloatingButton
        onClick={() =>
          router.push(
            `/${localActive}/protected/product-and-service/category/new`
          )
        }
      />
      <BaseCard title="หมวดหมู่ทั้งหมด">
        <>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 3 }}>
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  <TextField
                    fullWidth
                    label="ชื่อหมวดหมู่"
                    name="categoryName"
                    value={searchForm.categoryName}
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
            getRowId={(row) => row.categoryId}
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
            rows={categoryState}
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

export default CategoryTable;
