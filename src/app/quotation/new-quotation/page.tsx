"use client";

import React, { useEffect } from "react";
import { Box, Grid2, Typography } from "@mui/material";

// components
import CompanyInformation from "@/components/forms/quotation/CompanyInformations";
import ContactotInformation from "@/components/forms/quotation/ContactorInformations";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import PageContainer from "@/components/shared/PageContainer";
import PricingTable from "@/components/forms/pricing-table/PricingTable";
import PricingSummary from "@/components/forms/pricing-table/PricingSummary";
import DashboardCard from "@/components/shared/DashboardCard";
import { usePricingContext } from "@/contexts/PricingContext";
import {
  headerClean,
  useQuotationListContext,
} from "@/contexts/QuotationContext";

const NewQuotation = () => {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const { setCategories, setDiscount, setVatIncluded, setWithholdingTaxRate } =
    usePricingContext();
  const { setHeadForm, isPreview } = useQuotationListContext();

  useEffect(() => {
    setBreadcrumbs([
      { name: "เพิ่มใบเสนอราคา", href: `/protected/dashboard` },
      { name: "ใบเสนอ", href: `/protected/income/quotation` },
      { name: "เพิ่มใบเสนอราคาใหม่" },
    ]);
    return () => {
      if (!isPreview) {
        setBreadcrumbs([]);
      }
    };
  }, []);

  return (
    <PageContainer>
      <DashboardCard title="เพิ่มใบเสนอราคาใหม่">
        <Grid2 container spacing={3}>
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
            <Grid2 size={6}>{/* <DocumentFooter /> */}</Grid2>
            <Grid2 size={6}>
              <PricingSummary />
            </Grid2>
          </Grid2>
        </Grid2>
      </DashboardCard>
    </PageContainer>
  );
};

export default NewQuotation;
