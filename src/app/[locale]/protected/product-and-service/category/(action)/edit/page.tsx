"use client";

import { Grid2 } from "@mui/material";
import { useEffect, useState } from "react";

import CategoryForm from "@/components/forms/product-and-service/CategoryForm";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import PageContainer from "@/components/shared/PageContainer";

const CategoryNewPage = () => {

  const { setBreadcrumbs } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: "/dashboard" },
      { name: "คลังสินค้า", href: "/inventory" },
      { name: "เพิ่มหมวดหมู่ใหม่" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  return (
    <PageContainer>
      <CategoryForm />
    </PageContainer>
  );
};

export default CategoryNewPage;
