"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import ProductServiceTable from "@/components/shared/productServiceTable";
import BaseCard from "@/components/shared/BaseCard";

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
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <ProductServiceTable data={data} />
          </Grid>
          <Grid container item xs={12} lg={12} justifyContent="center">
            <Stack spacing={2}>
              <Pagination count={10} color="secondary" />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
