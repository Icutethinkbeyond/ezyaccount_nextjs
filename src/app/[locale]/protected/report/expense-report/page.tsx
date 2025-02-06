"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import ExpensesPreSummaryTable from "@/components/tables/report/ExpensesPreSummaryTable";

const expensereport = () => {


  return (
    <PageContainer title="ExpensesPreSummary" description="this is ExpensesPreSummary">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <ExpensesPreSummaryTable  tableName="ExpensesPreSummary Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default expensereport;