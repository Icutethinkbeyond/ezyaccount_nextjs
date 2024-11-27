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
} from "@mui/material";
import BaseCard from "@/components/shared/BaseCard";
import ConfirmDelete from "@/components/shared/ConfirmDialogCustom";
import { Quotation, useDatabaseContext } from "@/contexts/dbContext";
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
import StatusChip from "@/components/shared/StatusChipCustom";
import { formatNumber } from "@/utils/utils";

interface ProductTableProps {
  data: Quotation[];
  tableName: string | null;
  newDocumentHref: string | null;
  newDocumentName: string | null;
}

const QuotationsTable: React.FC<ProductTableProps> = ({ data }) => {
  const router = useRouter();
  const [rows, setRows] = useState<Quotation[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setRows(data);
  }, []);

  const handleAddClick = () => {
    console.log("Add button clicked!");
    router.push("/income/debit/new-debit");
  };

  const columns: GridColDef<Quotation>[] = [
    {
      field: "keyId",
      headerName: "เลขที่เอกสาร",
      width: 150,
      valueGetter: (value, row) => row.keyId,
    },
    {
      field: "siteName",
      headerName: "วันที่ออกเอกสาร",
      width: 150,
      valueGetter: (value, row) => row.headForm?.dateCreate,
    },
    {
      field: "contactorName",
      headerName: "ชื่อลูกค้า",
      width: 150,
      valueGetter: (value, row) => row.headForm?.contactorName, // ใช้ valueGetter เเทน renderCell ในการเข้าถึงข้อมูลใน array โดยเข้าผ่าน parameter "row"
    },
    {
      field: "repirePrice",
      headerName: "ยอดรวมสุทธิ",
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
            <IconButton
              size="small"
              color="secondary"
              // onClick={() => handleEdit(params.row.id)}
            >
              <EditCalendar />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              color="secondary"
              // onClick={() => handleUpdate(params.row.id)}
            >
              <ManageSearch />
            </IconButton>
          )}
          <ConfirmDelete itemName="Sample Item" onDelete={handleDeleteItem} />

          <IconButton
            size="small"
            color="info"
            // onClick={() => handleDeleteItem(params.row.id)}
          >
            <CloudDownload />
          </IconButton>
          <IconButton
            size="small"
            color="success"
            // onClick={() => handleRemove(params.row.id)}
          >
            <ForwardToInbox />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDeleteItem = () => {
    console.log("Item deleted");
  };

  const handleRemove = (keyId: string) => {
    return <ConfirmDelete itemName="Sample Item" onDelete={handleDeleteItem} />;
  };

  const handleEdit = (keyId: string) => {
    router.push(``);
  };

  const handleUpdate = (keyId: string) => {
    router.push(``);
  };

  return (
    <BaseCard title="Debits Table">
      <>
        <Grid2 container mb={1}>
          <Grid2 size={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="h3">ใบเพิ่มหนี้</Typography>
              <IconButton color="primary" onClick={handleAddClick}>
                <Add />
              </IconButton>
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
            {/* <Grid2 size={3}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "59%", height: "100%" }}
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="warning"
                sx={{ ml: 1, width: "37%", height: "100%" }}
              >
                Clear All
              </Button>
            </Grid2> */}
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
            paginationMode="server"
            rowCount={rowCount}
            onPaginationModelChange={setPaginationModel}
            loading={loading}
          />
        </Box>
      </>
    </BaseCard>
  );
};

export default QuotationsTable;
