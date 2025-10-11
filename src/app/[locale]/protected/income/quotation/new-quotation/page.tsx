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

const NewQuotation = () => {

  const { setBreadcrumbs } = useBreadcrumbContext();

    useEffect(() => {
      setBreadcrumbs([
        { name: "เพิ่มใบเสนอราคา", href: "/dashboard" },
        { name: "รายรับ", href: "/inventory" },
        { name: "ใบเสนอราคา" },
      ]);
      return () => {
        setBreadcrumbs([]);
      };
    }, []);

  return (
     <PageContainer>
       {/* <DashboardCard
        title={<Typography variant="h2">เพิ่มใบเสนอราคา</Typography>}
        action={
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <IconButton
              onClick={handlePrint}
              sx={{ color: "primary.main", fontSize: 28 }}
            >
              <Print />
            </IconButton>
            <IconButton
              onClick={handleMessage}
              sx={{ color: "info.main", fontSize: 28 }}
            >
              <Message />
            </IconButton>
            <IconButton
              onClick={() => handleExport()}
              sx={{ color: "success.main", fontSize: 28 }}
            >
              <GetApp />
            </IconButton>
          </Box>
        }
      > */}
        <Grid2 container spacing={3} sx={{ p: 3 }}>
          <Grid2 size={6}>
            <CompanyInformation />
          </Grid2>
          <Grid2 size={6}>
            <ContactotInformation />
          </Grid2>
          <Grid2 size={12}>
            <NewItems />
          </Grid2>
          <Grid2 size={12}>
            <ItemsTable />
          </Grid2>
          <Grid2 container size={12}>
            <Grid2 size={6}>
              <DocumentFooter />
            </Grid2>
            <Grid2 size={6}>
              {/* <CalculateItems /> */}
            </Grid2>
          </Grid2>
        </Grid2>
    </PageContainer>
  );
};

export default NewQuotation;
