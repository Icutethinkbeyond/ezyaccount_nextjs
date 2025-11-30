"use client";
import React, { useEffect } from "react";
import { Grid2 } from "@mui/material";
import PageContainer from "@/components/shared/PageContainer";

// components
import Breadcrumb from "@/components/shared/BreadcrumbCustom";
import CompanyInformation from "@/components/forms/CompanyInformations";
import ContactotInformation from "@/components/forms/ContactorInformations";
import NewItems from "@/components/forms/NewItems";
import ItemsTable from "@/components/forms/ItemsTable";
import DocumentFooter from "@/components/forms/DocumentFooter";
import CalculateItems from "@/components/forms/CalculateItems";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import { useLocale } from "next-intl";
import PricingTable from "@/components/forms/pricing-table/PricingTable";
import PricingSummary from "@/components/forms/pricing-table/PricingSummary";

const NewQuotation = () => {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const localActive = useLocale();

  useEffect(() => {
    setBreadcrumbs([
      { name: "เพิ่มใบเสนอราคา", href: `/${localActive}/protected/dashboard` },
      { name: "ใบเสนอ", href: `/${localActive}/protected/income/quotation` },
      { name: "เพิ่มใบเสนอราคาใหม่" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  // useEffect(() => {
  //   setBreadcrumbs([
  //     { name: "หน้าแรก", href: "/dashboard" },
  //     { name: "คลังอุปกรณ์", href: "/inventory" },
  //     { name: "เพิ่มอุปกรณ์ใหม่" },
  //   ]);
  //   return () => {
  //     setBreadcrumbs([]);
  //   };
  // }, []);

  return (
    <PageContainer>
      <Grid2 container spacing={3} sx={{ p: 3 }}>
        <Grid2 size={6}>
          <CompanyInformation />
        </Grid2>
        <Grid2 size={6}>
          <ContactotInformation />
        </Grid2>
        <Grid2 size={12}>
          <PricingTable />
        </Grid2>
        <Grid2 container size={12}>
          <Grid2 size={6}>
            {/* <DocumentFooter /> */}
          </Grid2>
          <Grid2 size={6}>
            <PricingSummary />
          </Grid2>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default NewQuotation;
