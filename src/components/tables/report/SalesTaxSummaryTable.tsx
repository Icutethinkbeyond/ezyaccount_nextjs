"use client";

import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridCellParams,
} from "@mui/x-data-grid";
import { Box, Grid, Grid2, IconButton } from "@mui/material";
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

  const columns: GridColDef<Quotation>[] = [
    {
      field: "number",
      headerName: "ลำดับ",
      width: 150,
      valueGetter: (value, row) => row.keyId,
    },
    { 
      field: "customerName",
      headerName: "ชื่อลูกค้า", 
      width: 150,
      valueGetter: (value, row) => row.headForm?.dateCreate,
    },
    {
      field: "taxId",
      headerName: "เลขทะเบียนผู้เสียภาษี",
      width: 150,
      valueGetter: (value, row) => row.headForm?.contactorName, // ใช้ valueGetter เเทน renderCell ในการเข้าถึงข้อมูลใน array โดยเข้าผ่าน parameter "row"
    },
    {
      field: "invoiceDate",
      headerName: "วันที่ใบกำกับ",
      width: 150,
      valueGetter: (value, row) => row.products,
    },
    {
      field: "invoiceId",
      headerName: "เลขที่ใบกำกับภาษี",
      width: 150,
      valueGetter: (value, row) => row.products,
    },
    {
      field: "branch",
      headerName: "สาขา",
      width: 150,
      valueGetter: (value, row) => row.products,
    },
    {
      field: "Price before tax",
      headerName: "ราคาก่อนภาษี",
      width: 150,
      valueGetter: (value, row) => row.status,
    },
    {
      field: "vat",
      headerName: "ภาษีมูลค่าเพิ่ม",
      width: 150,
      valueGetter: (value, row) => row.status,
    },
    {
      field: "total value including tax",
      headerName: "มูลค่ารวมภาษี",
      width: 150,
      valueGetter: (value, row) => row.status,
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
    <BaseCard title="Sale Tax Table">
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
    </BaseCard>
  );
};

export default QuotationsTable;
