"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components
import SalesOverview from "@/components/dashboard/SalesOverview";
import DailyActivity from "@/components/dashboard/DailyActivity";
import ProductPerformance from "@/components/dashboard/ProductPerformance";
import BlogCard from "@/components/dashboard/Blog";
import HeaderForm from "@/components/forms/income/headerForm";
import DashboardCard from "@/components/shared/DashboardCard";
import ProductsServicesList from "@/components/forms/income/productsServicesListForm";
import FooterForm from "@/components/forms/income/footerForm";
import NewProductItem from "@/components/forms/income/newProductItem";

const data = [
  {
    id: "1",
    title: "หัวข้อ 1",
    description: "รายละเอียดของหัวข้อ 1",
    quantity: 2,
    price: 500,
    discount: 50,
    total: 950,
    subRows: [
      {
        id: "1.1",
        title: "หัวข้อรอง 1.1",
        quantity: 1,
        price: 200,
        total: 200,
      },
      {
        id: "1.2",
        title: "หัวข้อรอง 1.2",
        quantity: 1,
        price: 300,
        total: 300,
      },
    ],
  },
  {
    id: "2",
    title: "หัวข้อ 2",
    quantity: 1,
    price: 400,
    total: 400,
    subRows: [
      {
        id: "2.1",
        title: "หัวข้อรอง 2.1",
        quantity: 1,
        price: 150,
        total: 150,
      },
      {
        id: "2.2",
        title: "หัวข้อรอง 2.2",
        quantity: 1,
        price: 250,
        total: 250,
      },
    ],
  },
];

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
              <NewProductItem />
            </Grid>
            <Grid item xs={12} lg={12}>
              <ProductsServicesList data={data} />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FooterForm />
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Dashboard;
