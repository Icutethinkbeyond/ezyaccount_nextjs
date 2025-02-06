"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import PurchaseOrderTable from "@/components/tables/expenses/PurchaseOrderTable";

const data = [
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

const purchaseorder = () => {


  return (
    <PageContainer title="Purchase Order" description="this is Purchase Order">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <PurchaseOrderTable tableName="Purchase Order Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default purchaseorder;