"use client";

import { Grid2 } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
import { useEffect, useState } from "react";

import CategoryForm from "@/components/forms/product-and-service/CategoryForm";
import CategoryTable from "@/components/forms/product-and-service/tables/CategoryTable";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import { useProductContext } from "@/contexts/ProductContext";
import { initialCategory } from "@/interfaces/Product";


const CategoryPage = () => {

  const [recall, setRecall] = useState<boolean>(false);

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
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12 }}>
          <CategoryForm setRecall={setRecall} recall={recall} />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <CategoryTable recall={recall} />
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default CategoryPage;
