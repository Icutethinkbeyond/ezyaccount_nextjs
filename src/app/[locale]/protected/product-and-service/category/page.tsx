"use client";

import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  Tooltip,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import { useRouter } from "next/navigation";
import {
  Add,
  CloudDownload,
  EditCalendar,
  ForwardToInbox,
} from "@mui/icons-material";

interface ProductTableProps {
  // data: Quotation[];
}

const categorylists: React.FC<ProductTableProps> = ({  }) => {

    //Set Breadcrumb
    const { setBreadcrumbs } = useBreadcrumbContext();
  
    useEffect(() => {
      setBreadcrumbs([
        { name: "หน้าแรก", href: "/dashboard" },
        { name: "คลังอุปกรณ์", href: "/inventory" },
        { name: "อุปกรณ์ทั้งหมด" },
      ]);
      return () => {
        setBreadcrumbs([]);
      };
    }, []);

  const router = useRouter();
  // const [rows, setRows] = useState<Quotation[]>([]); // ค่าเริ่มต้นเป็น array เปล่า
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [searchText, setSearchText] = useState<string>(""); // สำหรับเก็บข้อความที่ค้นหา
  const [statusFilter, setStatusFilter] = useState<string>(""); // สำหรับเก็บสถานะที่เลือก

  // Declare state variables for totals
  const [approvedTotal, setApprovedTotal] = useState<number>(0);
  const [notApprovedTotal, setNotApprovedTotal] = useState<number>(0);
  const [allTotal, setAllTotal] = useState<number>(0);

  // useEffect(() => {
  //   // setRows(data);
  // }, [data]);

  // ฟังก์ชันสำหรับค้นหา
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilter(event.target.value);
  };

  // const filteredRows = (rows || []).filter((row) => {
  //   const matchesSearch =
  //     row.headForm?.contactorName
  //       ?.toLowerCase()
  //       .includes(searchText.toLowerCase()) ||
  //     row.keyId?.toString().includes(searchText);
  //   const matchesStatus = statusFilter ? row.status === statusFilter : true;
  //   return matchesSearch && matchesStatus;
  // });

  // useEffect(() => {
  //   if (Array.isArray(rows)) {
  //     const approved = rows
  //       .filter((row) => row.status === "approved")
  //       .reduce((sum, row) => sum + (row.summary?.totalAmountDue || 0), 0);

  //     const notApproved = rows
  //       .filter((row) => row.status !== "approved")
  //       .reduce((sum, row) => sum + (row.summary?.totalAmountDue || 0), 0);

  //     const total = rows.reduce(
  //       (sum, row) => sum + (row.summary?.totalAmountDue || 0),
  //       0
  //     );

  //     setApprovedTotal(approved);
  //     setNotApprovedTotal(notApproved);
  //     setAllTotal(total);
  //   }
  // }, [rows]);

  const handleAddClick = () => {
    console.log("Add button clicked!");
    router.push("/product-and-service/category-list/new-category"); // เปลี่ยนเส้นทางไปยังหน้าเพิ่มหมวดหมู่ใหม่
  };

  const columns: GridColDef<any>[] = [
    {
      field: "productandserviceId",
      headerName: "รหัสหมวดหมู่สินค้า",
      width: 150,
      valueGetter: (value, row) => row.keyId,
    },
    {
      field: "productandserviceName",
      headerName: "ชื่อหมวดหมู่สินค้า",
      width: 250,
      valueGetter: (value, row) => row.headForm?.dateCreate,
    },
    {
      field: "detail",
      headerName: "รายละเอียด",
      width: 350,
      valueGetter: (value, row) => row.headForm?.contactorName,
    },
    {
      field: "Actions",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton size="small" color="secondary">
            <EditCalendar />
          </IconButton>
          {/* <ConfirmDelete
            itemName="Sample Item"
            onDelete={() => console.log("Item deleted")}
          /> */}
          <IconButton size="small" color="info">
            <CloudDownload />
          </IconButton>
          <IconButton size="small" color="success">
            <ForwardToInbox />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <>
        {/* Section: Approved, Not Approved, Pending Totals */}
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Card sx={{ p: 0.5, boxShadow: 4, mb: 2, maxWidth: "350px" }}>
            <CardContent>
              {/* Header: ราคารวมอนุมัติแล้ว */}
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "green",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ราคารวมอนุมัติแล้ว
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "bold",
                      color: "green",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {approvedTotal.toLocaleString("th-TH", {
                      style: "currency",
                      currency: "THB",
                    })}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                >
                  {/* ราคารวมไม่อนุมัติ */}
                  <Typography
                    variant="body1"
                    color="error"
                    sx={{
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      mb: 0.5,
                      ml: 3,
                    }}
                  >
                    ราคารวมไม่อนุมัติ
                  </Typography>
                  <Typography
                    variant="body1"
                    color="error"
                    sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                  >
                    {notApprovedTotal.toLocaleString("th-TH", {
                      style: "currency",
                      currency: "THB",
                    })}
                  </Typography>

                  {/* ราคารวมรออนุมัติ */}
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    sx={{ fontWeight: "bold", whiteSpace: "nowrap", mt: 1 }}
                  >
                    ราคารวมรออนุมัติ
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                  >
                    {allTotal.toLocaleString("th-TH", {
                      style: "currency",
                      currency: "THB",
                    })}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Section: Add Button and Data Grid */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          {/* สร้างสินค้า/บริการ */}
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h4" component="div">
              Category Lists
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddClick}
              sx={{
                backgroundColor: "#33CC99",
                color: "#fff",
                "&:hover": { backgroundColor: "#009933" },
                textTransform: "none",
              }}
            >
              สร้างสินค้า/บริการ
            </Button>
          </Box>

          {/* เพิ่มหมวดหมู่ */}
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddClick}
            sx={{
              backgroundColor: "#33CC99",
              color: "#fff",
              "&:hover": { backgroundColor: "#009933" },
              textTransform: "none",
            }}
          >
            เพิ่มหมวดหมู่
          </Button>
        </Box>

        {/*  ค้นหา  เลือกสถานะ */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <TextField
            label="ค้นหา"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearchChange}
            sx={{ flex: 1 }} // เปลี่ยน width เป็น flex เพื่อให้ปรับขนาดอัตโนมัติ
          />

          <TextField
            label="เลือกสถานะ"
            variant="outlined"
            select
            size="small"
            value={statusFilter}
            onChange={handleStatusChange}
            sx={{ width: 130 }} // กำหนดความกว้างคงที่ให้กับตัวเลือกสถานะ
          >
            <MenuItem value="">ทั้งหมด</MenuItem>
            <MenuItem value="approved">อนุมัติ</MenuItem>
            <MenuItem value="notApproved">ไม่อนุมัติ</MenuItem>
          </TextField>
        </Box>

        {/* <DataGrid
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.keyId}
          rows={rows}
          columns={columns}
          paginationMode="server"
          rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
        /> */}
      </>
    </>
  );
};

export default categorylists;
