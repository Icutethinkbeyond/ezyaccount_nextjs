"use client";

import { Box, Grid2, Typography } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";

import AddProductAndService from "@/components/forms/product-and-service/AddProductAndService";

const Dashboard = () => {
  return (
    <PageContainer>
      <Grid2 container spacing={2} sx={{ p: 2 }}>
        <AddProductAndService />
      </Grid2>
    </PageContainer>
  );
};

export default Dashboard;
