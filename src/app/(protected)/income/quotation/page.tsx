"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import QuotationsTable from "@/components/tables/income/QuotationsTable";
import { useDatabaseContext } from "@/contexts/dbContext";

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

const Dashboard = () => {

  const { qoutationState } = useDatabaseContext();

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <QuotationsTable data={qoutationState} tableName="Quotation Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation"/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
