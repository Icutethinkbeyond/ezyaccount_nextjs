"use client";

import React, { useState, useEffect } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import PageContainer from "@/components/shared/PageContainer";
import ProductTable from "@/components/forms/product-and-service/tables/ProductTable";

interface ProductTableProps {
  // data: Quotation[];
}

const productandservicelists: React.FC<ProductTableProps> = ({}) => {
  //Set Breadcrumb
  const { setBreadcrumbs } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: "/dashboard" },
      { name: "สินค้าเเละบริการ", href: "/inventory" },
      { name: "สินค้าเเละบริการทั้งหมด" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  return (
    <PageContainer>
      <ProductTable />
    </PageContainer>
  );
};

export default productandservicelists;
