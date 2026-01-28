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
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  CloudDownload,
  EditCalendar,
  ForwardToInbox,
  Add,
  Visibility,
  PictureAsPdf,
  Delete,
  DeleteSweep,
} from "@mui/icons-material";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
import { CustomToolbar } from "@/components/shared/CustomToolbar";
import Swal from 'sweetalert2';


interface ProductTableProps {
  // data: [];
  // tableName: string | null;
  // newDocumentHref: string | null;
  // newDocumentName: string | null;
}

const QuotationsTable: React.FC<ProductTableProps> = ({ }) => {

  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  // const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const result = await fetch('/api/income/quotation');
      const data = await result.json();

      // Check if data is an array before mapping
      if (Array.isArray(data)) {
        const mappedData = data.map((item: any) => ({
          ...item,
          keyId: item.documentIdNo,
          id: item.documentIdNo,
        }));
        setRows(mappedData);
      } else {
        console.error("Data received is not an array:", data);
        setRows([]);
      }
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
    router.push(`/quotation/new-quotation`);
  };

  const handleDelete = async (documentId: string) => {
    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณต้องการย้ายรายการนี้ไปที่ถังขยะใช่หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ย้ายไปถังขยะ!',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/income/quotation/${documentId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          Swal.fire(
            'ย้ายสำเร็จ!',
            'รายการของคุณถูกย้ายไปที่ถังขยะแล้ว',
            'success'
          );
          fetchQuotations();
        } else {
          Swal.fire(
            'เกิดข้อผิดพลาด!',
            'ไม่สามารถย้ายรายการได้',
            'error'
          );
        }
      } catch (error) {
        console.error("Error deleting quotation:", error);
        Swal.fire(
          'เกิดข้อผิดพลาด!',
          'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
          'error'
        );
      }
    }
  };

  const handlePDFDownload = (documentId: string) => {
    setDownloadingId(documentId);

    // สร้าง iframe ลับเพื่อโหลดหน้า preview ในเบื้องหลัง
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '-10000px';
    iframe.style.left = '-10000px';
    iframe.style.width = '1024px';
    iframe.style.height = '1000px';
    iframe.src = `/quotation/preview/${documentId}?print=true`;
    document.body.appendChild(iframe);

    // ลบ iframe ออกหลังจากดาวน์โหลดเสร็จ (ประมาณ 10 วินาทีเผื่อเวลาโหลด data และรัน html2pdf)
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
      setDownloadingId(null);
    }, 10000);
  };

  const columns: GridColDef[] = [
    {
      field: "keyId",
      headerName: "เลขที่เอกสาร",
      width: 200,
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
      width: 250,
      valueGetter: (value, row) => row.contactor?.contactorName || "-",
    },
    {
      field: "repirePrice",
      headerName: "ยอดรวมสุทธิ",
      width: 200,
      valueGetter: (value, row) => row.grandTotal?.toLocaleString(),
    },
    // {
    //   field: "status",
    //   headerName: "สถานะ",
    //   width: 150,
    //   valueGetter: (value, row) => row.documentStatus,
    // },
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
            onClick={() => router.push(`/quotation/edit-quotation/${params.row.documentId}`)}
          >
            <EditCalendar />
          </IconButton>

          <IconButton
            size="small"
            color="primary"
            onClick={() => router.push(`/quotation/preview/${params.row.documentId}`)}
          >
            <Visibility />
          </IconButton>

          <IconButton
            size="small"
            color="info"
            disabled={downloadingId === params.row.documentId}
            onClick={() => handlePDFDownload(params.row.documentId)}
          >
            {downloadingId === params.row.documentId ? (
              <CircularProgress size={20} color="info" />
            ) : (
              <PictureAsPdf />
            )}
          </IconButton>

          <IconButton
            size="small"
            sx={{ color: '#d33' }}
            onClick={() => handleDelete(params.row.documentId)}
          >
            <Delete />
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

      {/*  ใบเสนอราคา*/}

      <Grid2 container mb={1}>
        <Grid2 size={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
            <Typography variant="h3" component="div">
              ใบเสนอราคาทั้งหมด
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                startIcon={<DeleteSweep />}
                onClick={() => router.push('/quotation/trash')}
                sx={{
                  color: "#d33",
                  borderColor: "#d33",
                  "&:hover": { borderColor: "#b22", backgroundColor: "rgba(211, 51, 51, 0.04)" },
                  textTransform: "none",
                }}
              >
                ถังขยะ
              </Button>
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
          </Box>
        </Grid2>
      </Grid2>
      {/* <Divider /> */}

      <Box p={3} border="1px solid #ccc" borderRadius="8px" mb={2} mt={2}>
        <DataGrid
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.keyId} // ระบุ keyId เป็นค่า id ของแต่ละ row
          rows={rows}
          columns={columns}
          // paginationMode="server"
          // rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            toolbar: CustomToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default QuotationsTable;
