"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import SalesSummaryProductTable from "@/components/tables/report/SalesSummaryProductTable";
import { useDatabaseContext } from "@/contexts/dbContext";

const salesSummary = () => {

  const { qoutationState } = useDatabaseContext();

  return (
    <PageContainer title="SalesSummary" description="this is SalesSummary">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <SalesSummaryProductTable data={qoutationState} tableName="SalesSummary Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation"/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default salesSummary;