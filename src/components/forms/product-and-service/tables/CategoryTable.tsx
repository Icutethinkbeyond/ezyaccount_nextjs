"use client";

import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
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
import axios from "axios";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
import { useProductContext } from "@/contexts/ProductContext";
import ApiService from "@/services/APIServices";
import { Clear } from "@mui/icons-material";
import { useSnackbarContext } from "@/contexts/SnackbarContext";

interface CategoryProps {
  data?: Category | null;
  recall?: boolean;
}

function CustomToolbar() {
  return (
    <Grid2 container mb={2} mt={2}>
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: "Change density" } }}
        />
        <Box sx={{ flexGrow: 1 }} />
      </GridToolbarContainer>
    </Grid2>
  );
}

interface SearchFormData {
  categoryName: string;
}

const CategoryTable: React.FC<CategoryProps> = ({ recall }) => {
  const {
    categoryForm,
    setCategoryForm,
    categoryState,
    setCategoryState,
    setCategoryEdit,
  } = useProductContext();
  const { setOpenDialog, setSnackbar, snackbar } = useSnackbarContext();

  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<SearchFormData>({
    categoryName: "",
  });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const columns: GridColDef<Category>[] = [
    { field: "rowIndex", headerName: "ลำดับ", width: 70 },
    {
      field: "actions",
      headerName: "การจัดการ",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          {params.row.categoryName !== "uncategorized" && (
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
                itemId={params.row.categoryId}
                onDelete={handleDeleteItem}
                massage={`คุณต้องการลบหมวดหมู่ ${params.row.categoryName} ใช่หรือไม่?`}
              />
            </>
          )}
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
    try {
      await ApiService.get(
        `/api/equipment/category?page=${paginationModel.page + 1}&pageSize=${
          paginationModel.pageSize
        }`,
        setCategoryState,
        setRowCount,
        setLoading,
        {}
      );
    } catch (error: any) {
      if (error.message !== "Request was canceled") {
        console.error("Unhandled error:", error);
      }
    }
  };

  const searchData = async () => {
    try {
      // await fetchData(
      //   `/api/equipment/category/search?page=${
      //     paginationModel.page + 1
      //   }&pageSize=${paginationModel.pageSize}&categoryName=${
      //     formData.categoryName
      //   }`,
      //   setCategoryState,
      //   setRowCount,
      //   setLoading
      // );
    } catch (error: any) {
      if (error.message !== "Request was canceled") {
        console.error("Unhandled error:", error);
      }
    }
  };

  const handleDeleteItem = (categoryId: string) => {
    axios
      .delete(`/api/equipment/category?categoryId=${categoryId}`)
      .then((data) => {
        // console.log(data);
        setOpenDialog(true);
        setSnackbar({
          ...snackbar,
          message: `ระบบได้ลบ ${data.data.categoryName} เเล้ว`,
          notiColor: "success",
        });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request cancelled");
        } else {
          console.error("Fetch error:", error);
          setOpenDialog(true);
          setSnackbar({
            ...snackbar,
            message: error.message,
            notiColor: "error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
        getData();
      });
  };

  const handleEdit = (category: Category) => {
    setCategoryForm(category);
    setCategoryEdit(true);
  };

  const handleClear = () => {
    setFormData({
      categoryName: "",
    });
    getData();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
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
  }, [paginationModel, recall]);

  //return state
  useEffect(() => {
    setCategoryState([]);
  }, []);

  return (
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
                  value={formData.categoryName}
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
          loading={loading}
          slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: CustomToolbar }}
        />
      </>
    </BaseCard>
  );
};

export default CategoryTable;
