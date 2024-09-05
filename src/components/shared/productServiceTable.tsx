import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import BaseCard from "@/components/shared/BaseCard";
import {
  CloudDownload,
  DriveFileRenameOutline,
  Email,
  Print,
  RemoveCircle,
} from "@mui/icons-material";
import Link from "next/link";
import { Quotation, useDatabaseContext } from "@/contexts/dbContext";
import { formatNumber, formatUtcDate, makeDateMonth } from "@/utils/utils";
import StatusChip from "./statusChip";
import { useRouter } from "next/navigation";

interface ProductTableProps {
  data: Quotation[];
  tableName: string | null;
  newDocumentHref: string | null;
  newDocumentName: string | null;
}

const ProductServiceTable: React.FC<ProductTableProps> = ({
  data,
  tableName,
  newDocumentHref,
  newDocumentName,
}) => {

  const { removeQuotation } = useDatabaseContext();
  const router = useRouter();

  const handleRemove = (keyId: string) => {
    removeQuotation(keyId)
  }

  const handleEdit = (keyId: string) => {
    router.push(`/income/quotation/edit-quotation/${keyId}`)
  }

  return (
    <BaseCard title={tableName ? tableName : "Table Name"}>
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Grid container>
          <Grid container item xs={6}>
            <Link href={newDocumentHref ? newDocumentHref : "#"}>
              <Button
                variant="contained"
                color="warning"
                sx={{ marginBottom: "5px" }}
              >
                {newDocumentName ? newDocumentName : "New Document"}
              </Button>
            </Link>
          </Grid>
          <Grid container item xs={6} justifyContent="flex-end"></Grid>
        </Grid>

        <Table
          aria-label="table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Contactor Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Date Create
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {data.headForm
                          ? data.headForm.contactorName
                          : "Name Surname"}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        No.{" "}
                        {data.headForm
                          ? data.headForm?.quotationNumber
                          : "1xx-11x-xxx"}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {data
                      ? formatUtcDate(data?.createDate.toDateString())
                      : "01-01-2024"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusChip status={data.status} />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    ฿{" "}
                    {data.summary
                      ? formatNumber(data.summary?.totalAmountDue)
                      : "xxx,xxx"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" disabled>
                    <CloudDownload />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Print />
                  </IconButton>
                  <IconButton size="small" color="primary" disabled>
                    <Email />
                  </IconButton>
                  <IconButton size="small" color="secondary" sx={{ ml: 2 }} onClick={() => handleEdit(data.keyId)}>
                    <DriveFileRenameOutline />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleRemove(data.keyId)}>
                    <RemoveCircle />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default ProductServiceTable;
