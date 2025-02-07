"use client";

import { useEffect } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import ProductForm from "@/components/forms/product-and-service/ProductForm";

const Dashboard = () => {
  //Set Breadcrumb
  const { setBreadcrumbs } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: "/dashboard" },
      { name: "คลังอุปกรณ์", href: "/inventory" },
      { name: "อุปกรณ์ทั้งหมด" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  return (
    <PageContainer>
      <Grid2 container spacing={2} sx={{ p: 2 }}>
        <ProductForm />
      </Grid2>
    </PageContainer>
  );
};

export default Dashboard;
