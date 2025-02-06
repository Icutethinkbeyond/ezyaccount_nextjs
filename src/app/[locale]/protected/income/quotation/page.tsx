"use client";
import { Grid2, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import QuotationsTable from "@/components/tables/income/QuotationsTable";

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

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <QuotationsTable  tableName="Quotation Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/>
          </Grid2>
        </Grid2>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
