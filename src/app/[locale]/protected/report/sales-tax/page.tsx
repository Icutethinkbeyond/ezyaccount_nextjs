"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import SalesTaxSummaryTable from "@/components/tables/report/SalesTaxSummaryTable";

const salestax = () => {


  return (
    <PageContainer title="SalesTax Summary" description="this is SalesTax Summary">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <SalesTaxSummaryTable tableName="SalesTax Summary Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default salestax;