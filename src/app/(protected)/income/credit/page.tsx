"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import CreditsTable from "@/components/tables/income/CreditsTable";
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

const credits = () => {

  const { quotationState } = useDatabaseContext();

  return (
    <PageContainer title="Credits" description="this is Credits">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <CreditsTable data={quotationState} tableName="Credits Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation"/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default credits;