"use client";
import { Grid2, Box } from "@mui/material";
import PageContainer from "@/components/shared/PageContainer";
import { useEffect } from "react";
// components
// import SalesOverview from "@/components/dashboard/SalesOverview";
// import DailyActivity from "@/components/dashboard/DailyActivity";
// import ProductPerformance from "@/components/dashboard/ProductPerformance";
// import BlogCard from "@/components/dashboard/Blog";
// import MenuCard from "@/components/shared/menuCard";

// const incomeMenu = [
//   {
//     imageIcon: null,
//     href: "/income/quotation",
//     menuName: "Quotation"
//   },
// ];




const Dashboard = () => {

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            {/* <MenuCard data={incomeMenu}/> */}
            adasda
          </Grid2>
        </Grid2>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
