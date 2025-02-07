import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  Add,
  CloudDownload,
  ForwardToInbox,
  EditCalendar,
  ManageSearch,
  DriveFileRenameOutline,
  Print,
} from "@mui/icons-material";

interface ProductTableProps {
  data: [];
}

const QuotationsTable: React.FC<ProductTableProps> = ({ data }) => {
  const router = useRouter();
  const [rows, setRows] = useState<[]>([]);
  const [filteredRows, setFilteredRows] = useState<[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  // State สำหรับการค้นหา
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State สำหรับการเลือกประเภท
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setRows(data);
      setFilteredRows(data); // เริ่มต้นให้แสดงข้อมูลทั้งหมด
      setRowCount(data.length); // ตั้งค่า rowCount ตามจำนวนข้อมูลทั้งหมด
    } else {
      setRows([]); // กรณีที่ data เป็น undefined หรือไม่ใช่ array
      setFilteredRows([]);
      setRowCount(0);
    }
  }, [data]);

  // // ฟังก์ชันสำหรับกรองข้อมูล
  // useEffect(() => {
  //   let filtered = rows;

  //   // กรองตามการค้นหาข้อมูล
  //   if (searchQuery) {
  //     filtered = filtered.filter((row) =>
  //       ["keyId", "headForm?.contactorName", "products"]
  //         .map((field) =>
  //           String(row[field as keyof Quotation] || "").toLowerCase()
  //         )
  //         .some((value) => value.includes(searchQuery.toLowerCase()))
  //     );
  //   }

  //   // กรองตามประเภท
  //   if (selectedCategory) {
  //     filtered = filtered.filter((row) => row.status === selectedCategory);
  //   }

  //   setFilteredRows(filtered);
  //   setRowCount(filtered.length); // อัปเดต rowCount เมื่อมีการกรองข้อมูล
  // }, [searchQuery, rows, selectedCategory]);

  // // State สำหรับราคารวม
  const [approvedTotal, setApprovedTotal] = useState<number>(0);
  const [notApprovedTotal, setNotApprovedTotal] = useState<number>(0);
  const [allTotal, setAllTotal] = useState<number>(0);

  // useEffect(() => {
  //   const approved = (rows || [])
  //     .filter((row) => row.status === "approved")
  //     .reduce((sum, row) => sum + (row.summary?.totalAmountDue || 0), 0);

  //   const notApproved = (rows || [])
  //     .filter((row) => row.status !== "approved")
  //     .reduce((sum, row) => sum + (row.summary?.totalAmountDue || 0), 0);

  //   const total = (rows || []).reduce(
  //     (sum, row) => sum + (row.summary?.totalAmountDue || 0),
  //     0
  //   );

  //   setApprovedTotal(approved);
  //   setNotApprovedTotal(notApproved);
  //   setAllTotal(total);
  // }, [rows]);

  const handleDownload = () => {
    console.log("ดาวน์โหลดไฟล์");
    // เพิ่มโค้ดสำหรับดาวน์โหลดไฟล์
  };

  const handlePrint = () => {
    console.log("ปริ้นรายการ");
    window.print(); // ใช้ window.print() สำหรับการปริ้นในเบราว์เซอร์
  };

  const handleAddClick = () => {
    router.push(`/protected/user-and-customer/add-user-and-customer`);
  };

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "รหัสผู้ใช้งาน",
      width: 150,
      valueGetter: (value, row) => row.keyId,
    },
    {
      field: "name",
      headerName: "ชื่อ-นามสกุล",
      width: 150,
      valueGetter: (value, row) => row.headForm?.dateCreate,
    },
    {
      field: "email",
      headerName: "อีเมล์",
      width: 150,
      valueGetter: (value, row) => row.headForm?.contactorName,
    },
    {
      field: "tel",
      headerName: "เบอร์โทร",
      width: 150,
      valueGetter: (value, row) => row.products,
    },
    {
      field: "type",
      headerName: "ประเภท",
      width: 150,
      valueGetter: (value, row) => row.products,
    },
    {
      field: "status",
      headerName: "สถานะ",
      width: 150,
      valueGetter: (value, row) => row.status,
    },
    {
      field: "Actions",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          {params.row.status === "pending" ? (
            <IconButton size="small" color="secondary">
              <EditCalendar />
            </IconButton>
          ) : (
            <IconButton size="small" color="secondary">
              <ManageSearch />
            </IconButton>
          )}
          {/* <ConfirmDelete
            itemName="Sample Item"
            onDelete={() => console.log("Deleted")}
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

        {/* Section: Add Button */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h3" component="div">
              รายการผู้ใช้งาน/ลูกค้า
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
              สร้างรายการผู้ใช้งาน/ลูกค้า
            </Button>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="contained"
              startIcon={<Print />}
              onClick={handlePrint}
              sx={{
                backgroundColor: "#33CC99",
                color: "#fff",
                "&:hover": { backgroundColor: "#009933" },
                textTransform: "none",
              }}
            >
              ปริ้น
            </Button>
            <Button
              variant="contained"
              startIcon={<CloudDownload />}
              onClick={handleDownload}
              sx={{
                backgroundColor: "#33CC99",
                color: "#fff",
                "&:hover": { backgroundColor: "#009933" },
                textTransform: "none",
              }}
            >
              ดาวน์โหลด
            </Button>
          </Box>
        </Box>

        {/* Section: Search and Category Select */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <TextField
            label="ค้นหาสินค้าและบริการ"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "700%" }}
          />

          {/* Select for Category */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box flexGrow={1} />

            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>เลือกประเภท</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="ประเภท"
              >
                <MenuItem value={"category1"}>หมวดหมู่ 1</MenuItem>
                <MenuItem value={"category2"}>หมวดหมู่ 2</MenuItem>
                <MenuItem value={"category3"}>หมวดหมู่ 3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Data Grid */}
        <DataGrid
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.keyId}
          rows={filteredRows}
          columns={columns}
          paginationMode="server"
          rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
        />
      </>
    // <></>
  );
};

export default QuotationsTable;
