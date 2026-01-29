"use client";

import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  Add,
  DeleteSweep,
} from "@mui/icons-material";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
import { CustomToolbar } from "@/components/shared/CustomToolbar";
import SearchBox from "@/components/shared/SearchBox";
import PageHeader from "@/components/shared/PageHeader";
import { QuotationActionButtons } from "@/components/quotation/ActionButtons";
import {
  documentIdColumn,
  creationDateColumn,
  customerNameColumn,
  grandTotalColumn
} from "@/components/quotation/TableColumns";
import { IQuotation, IQuotationTableRow, QuotationsTableProps } from "@/contexts/QuotationContext";


const QuotationsTable: React.FC<QuotationsTableProps> = () => {

  const router = useRouter();
  const [rows, setRows] = useState<IQuotationTableRow[]>([]);
  const [filteredRows, setFilteredRows] = useState<IQuotationTableRow[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
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

      if (Array.isArray(data)) {
        const mappedData: IQuotationTableRow[] = data.map((item: IQuotation) => ({
          ...item,
          keyId: item.documentIdNo,
          id: item.documentIdNo,
        }));
        setRows(mappedData);
        setFilteredRows(mappedData);
      } else {
        console.error("Data received is not an array:", data);
        setRows([]);
        setFilteredRows([]);
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

  // Real-time search with debounce - รอ 2 วินาที หลังหยุดพิมพ์แล้วค่อยค้นหา
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRows(rows);
      return;
    }

    // Debounce: รอ 2 วินาที หลังจากหยุดพิมพ์แล้วค่อยค้นหา
    const timeoutId = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      const filtered = rows.filter((row: IQuotationTableRow) => {
        const documentIdNo = row.documentIdNo?.toLowerCase() || "";
        const contactorName = row.contactor?.contactorName?.toLowerCase() || "";
        const companyName = row.customerCompany?.companyName?.toLowerCase() || "";
        const grandTotal = row.grandTotal?.toString() || "";

        return (
          documentIdNo.includes(query) ||
          contactorName.includes(query) ||
          companyName.includes(query) ||
          grandTotal.includes(query)
        );
      });

      setFilteredRows(filtered);
    }, 1000);

    // Cleanup function: ยกเลิก timeout เก่าถ้ามีการพิมพ์ใหม่
    return () => clearTimeout(timeoutId);
  }, [searchQuery, rows]);

  const handleDelete = async (documentId: string) => {
    try {
      const response = await fetch(`/api/income/quotation/${documentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchQuotations();
      } else {
        console.error("Failed to delete quotation");
      }
    } catch (error) {
      console.error("Error deleting quotation:", error);
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
    documentIdColumn,
    creationDateColumn,
    customerNameColumn,
    grandTotalColumn,
    {
      field: "Actions",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <QuotationActionButtons
          documentId={params.row.documentId}
          onEdit={(id) => router.push(`/quotation/edit-quotation/${id}`)}
          onPreview={(id) => window.open(`/quotation/preview/${id}`, '_blank')}
          onDownloadPDF={handlePDFDownload}
          onDelete={handleDelete}
          isDownloading={downloadingId === params.row.documentId}
        />
      ),
    },
  ];

  const allTotal = rows.reduce((sum: number, row: IQuotationTableRow) => sum + (row.grandTotal || 0), 0);

  return (
    <Box>

      {/*  ใบเสนอราคา*/}

      <PageHeader
        title="ใบเสนอราคาทั้งหมด"
        actions={
          <>
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
          </>
        }
      />

      <Box mb={2}>
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </Box>
      {/* <Divider /> */}

      <Box p={3} border="1px solid #ccc" borderRadius="8px" mb={2} mt={2}>
        <DataGrid
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.keyId} // ระบุ keyId เป็นค่า id ของแต่ละ row
          rows={filteredRows}
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
