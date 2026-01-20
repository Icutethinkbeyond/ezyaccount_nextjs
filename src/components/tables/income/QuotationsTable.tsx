"use client";

import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridCellParams,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  CloudDownload,
  Download,
  DriveFileRenameOutline,
  EditCalendar,
  Email,
  ForwardToInbox,
  ManageSearch,
  Add,
} from "@mui/icons-material";
import { formatNumber } from "@/utils/utils";
import FloatingButton from "@/components/shared/FloatingButton";
import { useLocale } from "next-intl";


interface ProductTableProps {
  // data: [];
  // tableName: string | null;
  // newDocumentHref: string | null;
  // newDocumentName: string | null;
}

const QuotationsTable: React.FC<ProductTableProps> = ({ }) => {

  const router = useRouter();
  const localActive = useLocale();
  const [rows, setRows] = useState<any[]>([]);
  // const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const result = await fetch('/api/income/quotation');
      const data = await result.json();
      // Map data to match DataGrid expectations
      const mappedData = data.map((item: any) => ({
        ...item,
        keyId: item.documentIdNo, // Use documentIdNo as key
        id: item.documentIdNo, // DataGrid needs 'id'
      }));
      setRows(mappedData);
    } catch (error) {
      console.error("Failed to fetch quotations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleAddClick = () => {
    console.log("Add button clicked!");
    router.push(`/${localActive}/protected/income/quotation/new-quotation`);
  };

  const columns: GridColDef[] = [
    {
      field: "keyId",
      headerName: "เลขที่เอกสาร",
      width: 150,
      valueGetter: (value, row) => row.documentIdNo,
    },
    {
      field: "createDate",
      headerName: "วันที่ออกเอกสาร",
      width: 150,
      valueGetter: (value, row) => {
        if (!row.createdAt) return "-";
        return new Date(row.createdAt).toLocaleDateString("th-TH");
      },
    },
    {
      field: "contactorName",
      headerName: "ชื่อลูกค้า",
      width: 200,
      valueGetter: (value, row) => row.contactor?.contactorName || "-",
    },
    {
      field: "repirePrice",
      headerName: "ยอดรวมสุทธิ",
      width: 150,
      valueGetter: (value, row) => row.grandTotal?.toLocaleString(),
    },
    {
      field: "status",
      headerName: "สถานะ",
      width: 150,
      valueGetter: (value, row) => row.documentStatus,
    },
    {
      field: "Actions",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            color="secondary"
            onClick={() => router.push(`/${localActive}/protected/income/quotation/edit-quotation/${params.row.documentId}`)}
          >
            <EditCalendar />
          </IconButton>

          <IconButton
            size="small"
            color="info"
          >
            <CloudDownload />
          </IconButton>
          <IconButton
            size="small"
            color="success"
          >
            <ForwardToInbox />
          </IconButton>
        </>
      ),
    },
  ];

  // Calculations for summary cards
  const approvedTotal = 0; // Implement if status logic exists
  const notApprovedTotal = 0;
  const allTotal = rows.reduce((sum, row) => sum + (row.grandTotal || 0), 0);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Card sx={{ p: 0.5, boxShadow: 4, mb: 2, maxWidth: "350px" }}>
          {" "}
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

      {/* Icon ดาวน์โหลด*/}

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="info"
          startIcon={<CloudDownload />}
          onClick={() => console.log("ดาวน์โหลดข้อมูล")}
        >
          ดาวน์โหลดรายการ
        </Button>
      </Box>

      {/*  ใบเสนอราคา*/}

      <Grid2 container mb={1}>
        <Grid2 size={6}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h4" component="div">
              ใบเสนอราคา
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
              สร้างใบเสนอราคา
            </Button>
          </Box>
        </Grid2>
        <Grid2 container size={6} justifyContent="flex-end">
          <Button variant="contained" color="success" sx={{ height: "100%" }}>
            Search
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{ ml: 1, height: "100%" }}
          >
            Clear All
          </Button>
        </Grid2>
      </Grid2>
      <Divider />
      <Grid2 mt={3} mb={3}>
        <Grid2
          direction="row"
          container
          spacing={3}
          sx={{ background: "#fff" }}
        >
          <Grid2 size={3}>
            <TextField
              label="เลขเอกสาร (optional)"
              type="text"
              fullWidth
              size="small"
            />
          </Grid2>
          <Grid2 size={3}>
            <TextField
              label="ชื่อลูกค้า (optional)"
              type="text"
              fullWidth
              size="small"
            />
          </Grid2>

          <Grid2 size={3}>
            <TextField
              label="ยอดรวมสุทธิ (optional)"
              type="text"
              fullWidth
              size="small"
            />
          </Grid2>
          <Grid2 size={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={statusBorrow}
                label="Status"
              >
                <MenuItem value={"all-status"}>All Status</MenuItem>
                <MenuItem value={"borrowed"}>Active</MenuItem>
                <MenuItem value={"returned"}>InActive</MenuItem>
                <MenuItem value={"damaged"}>Waiting</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
      </Grid2>
      <Box p={3} border="1px solid #ccc" borderRadius="8px" mb={2}>
        <DataGrid
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.keyId} // ระบุ keyId เป็นค่า id ของแต่ละ row
          rows={rows}
          columns={columns}
          // paginationMode="server"
          // rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default QuotationsTable;
