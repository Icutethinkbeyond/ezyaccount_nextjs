"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import WithholdingSlipsTable from "@/components/tables/expenses/WithholdingSlipsTable";

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

const withholdingslips = () => {


  return (
    <PageContainer title="Withholding Slips" description="this is Withholding Slips">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <WithholdingSlipsTable tableName="Withholding Slips Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default withholdingslips;