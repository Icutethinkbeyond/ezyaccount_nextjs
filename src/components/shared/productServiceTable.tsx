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
  Card,
  Paper,
  Fab,
  Button,
  Grid,
} from "@mui/material";
import BaseCard from "@/components/shared/BaseCard";
import {
  CloudDownload,
  DeleteSweepTwoTone,
  DriveFileRenameOutline,
  EditNote,
  EditNoteTwoTone,
  Email,
  Print,
  RemoveCircle,
} from "@mui/icons-material";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
  },
];

interface ProductServiceList {
  imageIcon: string | null;
  href: string;
  menuName: string;
  total: number;
  contractorName: string;
  status: string;
}

interface ProductTableProps {
  data: ProductServiceList[];
  tableName: string;
}
const ProductServiceTable = () => {
  // const ProductServiceTable: React.FC<ProductTableProps> = ({ data }) => {
  return (
    <BaseCard title="Product Perfomance">
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
            <Link href="/income/quotation/new-quotation">
            <Button
              variant="contained"
              color="warning"
              sx={{ marginBottom: "5px" }}
            >
              New Quotation
            </Button>
            </Link>
          </Grid>
          <Grid container item xs={6} justifyContent="flex-end"></Grid>
        </Grid>

        <Table
          aria-label="simple table"
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
                  Date Create
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Contactor Name
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
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {product.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {product.name}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        {product.post}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {product.pname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: product.pbg,
                      color: "#fff",
                    }}
                    size="small"
                    label={product.priority}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">${product.budget}k</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <CloudDownload />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Print />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Email />
                  </IconButton>
                  <IconButton size="small" color="secondary" sx={{ ml: 2 }}>
                    <DriveFileRenameOutline />
                  </IconButton>
                  <IconButton size="small" color="error">
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
