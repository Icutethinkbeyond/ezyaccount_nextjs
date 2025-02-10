"use client";

import { Grid2 } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
import { useEffect, useState } from "react";

import QuotationForm from "@/components/forms/income/QuotationForm";
// import CategoryTable from "@/components/forms/product-and-service/tables/CategoryTable";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import { useProductContext } from "@/contexts/ProductContext";
import { initialCategory } from "@/interfaces/Product";


const NewQuotationPage = () => {

  const [recall, setRecall] = useState<boolean>(false);

  const { setBreadcrumbs } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: "/dashboard" },
      { name: "ใบเสนอราคา", href: "/quotation" },
      { name: "สร้างใบเสนอราคา" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  return (
    <PageContainer>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12 }}>
          <QuotationForm setRecall={setRecall} recall={recall} />
        </Grid2>
        {/* <Grid2 size={{ xs: 12 }}>
          <CategoryTable recall={recall} />
        </Grid2> */}
      </Grid2>
    </PageContainer>
  );
};

export default NewQuotationPage;
