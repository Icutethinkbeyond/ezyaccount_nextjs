"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import ProfitAndLossPreSummaryIncomeTable from "@/components/tables/report/ProfitAndLossPreSummaryIncomeTable";
import { useDatabaseContext } from "@/contexts/dbContext";

const profitandloss = () => {

  const { quotationState } = useDatabaseContext();

  return (
    <PageContainer title="ProfitAndLossPreSummaryIncome" description="this is ProfitAndLossPreSummaryIncome">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <ProfitAndLossPreSummaryIncomeTable data={quotationState} tableName="ProfitAndLossPreSummaryIncome Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation"/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default profitandloss;