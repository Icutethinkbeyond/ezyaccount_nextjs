"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components
import SalesOverview from "@/components/dashboard/SalesOverview";
import DailyActivity from "@/components/dashboard/DailyActivity";
import ProductPerformance from "@/components/dashboard/ProductPerformance";
import BlogCard from "@/components/dashboard/Blog";
// import MenuCard from "@/components/shared/menuCard";

const incomeMenu = [
  {
    imageIcon: null,
    href: "/income/quotation",
    menuName: "Quotation"
  },
];


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* <MenuCard data={incomeMenu}/> */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
