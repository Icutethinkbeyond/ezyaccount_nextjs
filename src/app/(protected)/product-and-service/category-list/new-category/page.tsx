"use client";
import { Grid, Box, Grid2, Typography } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";

// components
import HeaderForm from "@/components/forms/income/headerForm";
import DashboardCard from "@/components/shared/DashboardCard";
import Breadcrumb from "@/components/shared/BreadcrumbCustom";
import AddProductCategoryForm from "@/components/forms/product-and-service/AddProductCategoryForm";
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
      <DashboardCard title="เพิ่มหมวดหมู่สินค้า/บริการ">
        <Grid2 container spacing={2} sx={{ p: 2 }}>
          <Grid2 size={12}>
            <AddProductCategoryForm />
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
