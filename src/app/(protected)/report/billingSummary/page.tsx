"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import BillingSummaryTable from "@/components/tables/report/BillingSummaryTable";
import { useDatabaseContext } from "@/contexts/dbContext";

const billingSummary = () => {

  const { qoutationState } = useDatabaseContext();

  return (
    <PageContainer title="BillingSummary" description="this is BillingSummary">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <BillingSummaryTable data={qoutationState} tableName="BillingSummary Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation"/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default billingSummary;