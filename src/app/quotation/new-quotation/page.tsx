"use client";

import React, { useEffect } from "react";
import { Grid2 } from "@mui/material";

// components
import CompanyInformation from "@/components/forms/quotation/CompanyInformations";
import ContactotInformation from "@/components/forms/quotation/ContactorInformations";
import PageContainer from "@/components/shared/PageContainer";
import PricingTable from "@/components/forms/pricing-table/PricingTable";
import PricingSummary from "@/components/forms/pricing-table/PricingSummary";
import DashboardCard from "@/components/shared/DashboardCard";
import { headerClean, useQuotationListContext } from "@/contexts/QuotationContext";
import { usePricingContext } from "@/contexts/PricingContext";

const NewQuotation = () => {
  const { setHeadForm } = useQuotationListContext();
  const { setCategories, setDiscount, setVatIncluded, setWithholdingTaxRate } = usePricingContext();

  // Reset ฟอร์มทั้งหมดเมื่อเข้าหน้า New Quotation
  useEffect(() => {
    console.log("🔄 Resetting form data for new quotation...");

    // Reset header form (บริษัท + ผู้ติดต่อ)
    setHeadForm(headerClean);

    // Reset pricing data
    setCategories([]);
    setDiscount(0);
    setVatIncluded(false);
    setWithholdingTaxRate(0);

    console.log("✅ Form reset complete");
  }, []); // Run only once when component mounts

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
