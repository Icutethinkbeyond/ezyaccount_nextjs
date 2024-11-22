"use client";
import { Grid, Box, Grid2, Typography } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";

// components
import HeaderForm from "@/components/forms/income/headerForm";
import DashboardCard from "@/components/shared/DashboardCard";
import Breadcrumb from "@/components/shared/BreadcrumbCustom";
import CompanyInformation from "@/components/forms/CompanyInformations";
import NewProductItem from "@/components/forms/income/newProductItem";
import ProductsServicesList from "@/components/forms/income/productsServicesListForm";
import FooterForm from "@/components/forms/income/footerForm";
import ContactotInformation from "@/components/forms/ContactorInformations";
import CalculateItems from "@/components/forms/CalculateItems";
import DocumentFooter from "@/components/forms/DocumentFooter";
import NewItems from "@/components/forms/NewItems";
import ItemsTable from "@/components/forms/ItemsTable";

const Dashboard = () => {
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
      <DashboardCard title="สร้างใบเพิ่มหนี้">
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
        {/* <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <HeaderForm />
            </Grid>
            <Grid item xs={12} lg={12}>
              <NewProductItem isEdit={false} />
            </Grid>
            <Grid item xs={12} lg={12}>
              <ProductsServicesList />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FooterForm isEdit={false}/>
            </Grid>
          </Grid>
        </Box> */}
      </DashboardCard>
    </PageContainer>
  );
};

export default Dashboard;
