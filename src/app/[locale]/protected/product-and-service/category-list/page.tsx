"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import CategoryListTable from "@/components/tables/products-and-services/CategoryListTable";

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

const categorylists = () => {


  return (
    <PageContainer title="Category List" description="this is Category List">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* <CategoryListTable data={quotationState} tableName="Category List Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation"/> */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default categorylists;