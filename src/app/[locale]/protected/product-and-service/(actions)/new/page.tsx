"use client";

import { useEffect } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import ProductForm from "@/components/forms/product-and-service/ProductForm";
import PageContainer from "@/components/shared/PageContainer";

const Dashboard = () => {
  //Set Breadcrumb
  const { setBreadcrumbs } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: "/dashboard" },
      { name: "สินค้าเเละบริการ", href: "/product-and-service" },
      { name: "เพิ่มสินค้าเเละบริการ" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  return (
    <PageContainer>
      <ProductForm />
    </PageContainer>
  );
};

export default Dashboard;
