"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import PurchaseOrderSummaryOrderTable from "@/components/tables/report/PurchaseOrderSummary-orderTable";
import { useDatabaseContext } from "@/contexts/dbContext";

const purchaseorder = () => {

  const { qoutationState } = useDatabaseContext();

  return (
    <PageContainer title="PurchaseOrder" description="this is PurchaseOrder">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <PurchaseOrderSummaryOrderTable data={qoutationState} tableName="PurchaseOrder Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation"/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default purchaseorder;