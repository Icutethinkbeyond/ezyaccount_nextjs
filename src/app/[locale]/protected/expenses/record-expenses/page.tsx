"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import RecordExpensesTable from "@/components/tables/expenses/RecordExpensesTable";

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

const recordexpenses = () => {


  return (
    <PageContainer title="Record Expenses" description="this is Record Expenses">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <RecordExpensesTable  tableName="Record Expenses Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default recordexpenses;