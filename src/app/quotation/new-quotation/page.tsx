"use client";

import React from "react";
import { Grid2 } from "@mui/material";

// components
import CompanyInformation from "@/components/forms/quotation/CompanyInformations";
import ContactotInformation from "@/components/forms/quotation/ContactorInformations";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import PageContainer from "@/components/shared/PageContainer";
import PricingTable from "@/components/forms/pricing-table/PricingTable";
import PricingSummary from "@/components/forms/pricing-table/PricingSummary";
import DashboardCard from "@/components/shared/DashboardCard";

const NewQuotation = () => {
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
