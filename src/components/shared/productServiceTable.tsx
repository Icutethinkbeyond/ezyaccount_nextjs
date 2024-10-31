// import React from "react";
// import {
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Chip,
//   TableContainer,
//   IconButton,
//   Button,
//   Grid,
// } from "@mui/material";
// import BaseCard from "@/components/shared/BaseCard";
// import {
//   CloudDownload,
//   DriveFileRenameOutline,
//   Email,
//   Print,
//   RemoveCircle,
// } from "@mui/icons-material";
// import Link from "next/link";
// import { Quotation, useDatabaseContext } from "@/contexts/dbContext";
// import { formatNumber, formatUtcDate, makeDateMonth } from "@/utils/utils";
// import StatusChip from "./statusChip";
// import { useRouter } from "next/navigation";

// interface ProductTableProps {
//   data: Quotation[];
//   tableName: string | null;
//   newDocumentHref: string | null;
//   newDocumentName: string | null;
// }

// const ProductServiceTable: React.FC<ProductTableProps> = ({
//   data,
//   tableName,
//   newDocumentHref,
//   newDocumentName,
// }) => {

//   const { removeQuotation } = useDatabaseContext();
//   const router = useRouter();

//   const handleRemove = (keyId: string) => {
//     removeQuotation(keyId)
//   }

//   const handleEdit = (keyId: string) => {
//     router.push(`/income/quotation/edit-quotation/${keyId}`)
//   }

//   return (
//     <BaseCard title={tableName ? tableName : "Table Name"}>
//       <TableContainer
//         sx={{
//           width: {
//             xs: "274px",
//             sm: "100%",
//           },
//         }}
//       >
//         <Grid container>
//           <Grid container item xs={6}>
//             <Link href={newDocumentHref ? newDocumentHref : "#"}>
//               <Button
//                 variant="contained"
//                 color="warning"
//                 sx={{ marginBottom: "5px" }}
//               >
//                 {newDocumentName ? newDocumentName : "New Document"}
//               </Button>
//             </Link>
//           </Grid>
//           <Grid container item xs={6} justifyContent="flex-end"></Grid>
//         </Grid>

//         <Table
//           aria-label="table"
//           sx={{
//             whiteSpace: "nowrap",
//             mt: 2,
//           }}
//         >
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <Typography color="textSecondary" variant="h6">
//                   Id
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography color="textSecondary" variant="h6">
//                   Contactor Name
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography color="textSecondary" variant="h6">
//                   Date Create
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography color="textSecondary" variant="h6">
//                   Status
//                 </Typography>
//               </TableCell>
//               <TableCell align="right">
//                 <Typography color="textSecondary" variant="h6">
//                   Total
//                 </Typography>
//               </TableCell>
//               <TableCell align="center">
//                 <Typography color="textSecondary" variant="h6">
//                   Action
//                 </Typography>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((data, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   <Typography fontSize="15px" fontWeight={500}>
//                     {index + 1}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center">
//                     <Box>
//                       <Typography variant="h6" fontWeight={600}>
//                         {data.headForm
//                           ? data.headForm.contactorName
//                           : "Name Surname"}
//                       </Typography>
//                       <Typography color="textSecondary" fontSize="13px">
//                         No.{" "}
//                         {data.headForm
//                           ? data.headForm?.quotationNumber
//                           : "1xx-11x-xxx"}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </TableCell>
//                 <TableCell>
//                   <Typography color="textSecondary" variant="h6">
//                     {data
//                       ? formatUtcDate(data?.createDate.toDateString())
//                       : "01-01-2024"}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <StatusChip status={data.status} />
//                 </TableCell>
//                 <TableCell align="right">
//                   <Typography variant="h6">
//                     ฿{" "}
//                     {data.summary
//                       ? formatNumber(data.summary?.totalAmountDue)
//                       : "xxx,xxx"}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right">
//                   <IconButton size="small" color="primary" disabled>
//                     <CloudDownload />
//                   </IconButton>
//                   <IconButton size="small" color="primary">
//                     <Print />
//                   </IconButton>
//                   <IconButton size="small" color="primary" disabled>
//                     <Email />
//                   </IconButton>
//                   <IconButton size="small" color="secondary" sx={{ ml: 2 }} onClick={() => handleEdit(data.keyId)}>
//                     <DriveFileRenameOutline />
//                   </IconButton>
//                   <IconButton size="small" color="error" onClick={() => handleRemove(data.keyId)}>
//                     <RemoveCircle />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </BaseCard>
//   );
// };

// export default ProductServiceTable;

"use client";

import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Box, Grid, Grid2, IconButton, Paper, Typography } from "@mui/material";
import BaseCard from "@/components/shared/BaseCard";
// import SearchForm from "@/components/shared/SearchForm";
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
import StatusChip from "@/components/shared/statusChip";
import { formatNumber } from "@/utils/utils";

interface ProductTableProps {
  data: Quotation[];
  tableName: string | null;
  newDocumentHref: string | null;
  newDocumentName: string | null;
}

const ProductServiceTable: React.FC<ProductTableProps> = ({ data }) => {

  const router = useRouter();
  const [rows, setRows] = useState<Quotation[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setRows(data)
  }, [])

  const columns: GridColDef[] = [
    { field: "maintenanceId", headerName: "ID", width: 150  },
    { field: "headForm", headerName: "Contactor Name", width: 150, renderCell: (param) => param.contactorName },
    { field: "siteName", headerName: "Date Create", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
    {
      field: "repirePrice",
      headerName: "Total",
      width: 150,
      renderCell: (params) => formatNumber(params.value),
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
              onClick={() => handleEdit(params.row.id)}
            >
              <EditCalendar />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              color="secondary"
              onClick={() => handleUpdate(params.row.id)}
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
            onClick={() => handleRemove(params.row.id)}
          >
            <ForwardToInbox />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/maintenence-documents?page=${paginationModel.page + 1}&pageSize=${
          paginationModel.pageSize
        }`
      );
      const result = await response.json();

      setRows(result.data);
      setRowCount(result.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  const handleDeleteItem = () => {
    console.log("Item deleted");
    // Your delete logic goes here
  };

  const handleRemove = (keyId: string) => {
    return <ConfirmDelete itemName="Sample Item" onDelete={handleDeleteItem} />;
    // removeQuotation(keyId)
  };

  const handleEdit = (keyId: string) => {
    router.push(`/maintenance-request/edit-maintenance-request/MA001`);
    // router.push(`/user-management/edit-profile/${keyId}`)
  };

  const handleUpdate = (keyId: string) => {
    router.push(`/maintenance-request/progress/MA001`);
    // router.push(`/user-management/edit-profile/${keyId}`)
  };

  // const handleRemove = (id: string) => {
  //   return (
  //     <ConfirmDelete
  //       itemName="Sample Item"
  //       onDelete={() => handleDeleteItem(id)}
  //     />
  //   );
  // };

  return (
    <BaseCard title="Maintenance Table">
      <DataGrid
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        sx={{ border: 0 }}
        rows={rows}
        columns={columns}
        paginationMode="server"
        rowCount={rowCount}
        // paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={loading}
      />
    </BaseCard>
  );
};

export default ProductServiceTable;
