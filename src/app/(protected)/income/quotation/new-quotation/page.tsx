"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";

// components
import HeaderForm from "@/components/forms/income/headerForm";
import DashboardCard from "@/components/shared/DashboardCard";
import ProductsServicesList from "@/components/forms/income/productsServicesListForm";
import FooterForm from "@/components/forms/income/footerForm";
import NewProductItem from "@/components/forms/income/newProductItem";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title="New Quotation">
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <HeaderForm />
            </Grid>
            <Grid item xs={12} lg={12}>
              <NewProductItem isEdit={false}/>
            </Grid>
            <Grid item xs={12} lg={12}>
              <ProductsServicesList />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FooterForm isEdit={false}/>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Dashboard;
