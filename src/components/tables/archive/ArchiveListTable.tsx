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
      field: "keyId",
      headerName: "ไฟล์",
      width: 600,
      valueGetter: (value, row) => row.keyId,
    },
    { 
      field: "dateCreate",
      headerName: "วันที่", 
      width: 200,
      valueGetter: (value, row) => row.headForm?.dateCreate,
    },
    {
      field: "Actions",
      headerName: "จัดการ",
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
    <BaseCard title="Archive Table">
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
