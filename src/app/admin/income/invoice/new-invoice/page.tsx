"use client";
import { Grid, Box, IconButton, Grid2, Typography } from "@mui/material";
import { Print, GetApp, Message } from "@mui/icons-material";
import PageContainer from "@/components/container/PageContainer";

// components
import Breadcrumb from "@/components/shared/BreadcrumbCustom";
import DashboardCard from "@/components/shared/DashboardCard";
import CompanyInformation from "@/components/forms/CompanyInformations";
import ContactotInformation from "@/components/forms/ContactorInformations";
import NewItems from "@/components/forms/NewItems";
import ItemsTable from "@/components/forms/ItemsTable";
import DocumentFooter from "@/components/forms/DocumentFooter";
import CalculateItems from "@/components/forms/CalculateItems";

const NewInvoice = () => {
  const handlePrint = () => {
    console.log("Print clicked");
  };

  const handleDownload = () => {
    console.log("Download clicked");
  };

  const handleMessage = () => {
    console.log("Message clicked");
  };

  return (
    <PageContainer>
      <Breadcrumb
        title="Add Maintenance Requests"
        breadcrumbs={[
          { name: "Home", href: "/dashboard" },
          { name: "Maintenance Requests", href: "/maintenance-request" },
          { name: "Add Maintenance Request" },
        ]}
      />
      <DashboardCard
        title={<Typography variant="h2">สร้างใบเสร็จ/ใบกำกับภาษี</Typography>}
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
              onClick={handleDownload}
              sx={{ color: "success.main", fontSize: 28 }}
            >
              <GetApp />
            </IconButton>
          </Box>
        }
      >
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
              <CalculateItems />
            </Grid2>
          </Grid2>
        </Grid2>
      </DashboardCard>
    </PageContainer>
  );
};

export default NewInvoice;
