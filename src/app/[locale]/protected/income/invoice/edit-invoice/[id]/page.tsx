"use client";
import { Grid2, Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components
import HeaderForm from "@/components/forms/income/headerForm";
import DashboardCard from "@/components/shared/DashboardCard";
import Breadcrumb from "@/components/shared/BreadcrumbCustom";
import ProductsServicesList from "@/components/forms/income/productsServicesListForm";
import FooterForm from "@/components/forms/income/footerForm";
import NewProductItem from "@/components/forms/income/newProductItem";
import { Quotation, useDatabaseContext } from "@/contexts/dbContext";
import { useEffect } from "react";
import { useProductServiceListContext } from "@/contexts/QuotationContext";
import {
  Product,
  FormDataFooter,
} from "../../../../../../contexts/QuotationContext";

function EditInvoice({ params }: { params: { id: string } }) {
  const { qoutationState, setEditQuotation } = useDatabaseContext();
  const { setHeadForm, setProducts, setFooterForm } =
    useProductServiceListContext();

  const findObjectByKeyId = (
    data: Quotation[],
    keyId: string
  ): Quotation | undefined => {
    let _quotation = data.find((item) => item.keyId === keyId);

    if (_quotation) {
      return _quotation;
    } else {
      return;
    }
  };

  useEffect(() => {
    // console.log(params.id);
    const result = findObjectByKeyId(qoutationState, params.id);

    if (result) {
      setEditQuotation(result);
    }

    if (result?.headForm && result?.products && result?.summary) {
      const { headForm, products, summary } = result;
      setHeadForm(headForm);
      setProducts(products);
      setFooterForm(summary);
    }
    console.log(result);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
    <Breadcrumb
      title="Add Maintenance Requests"
      breadcrumbs={[
        { name: "Home", href: "/dashboard" },
        { name: "Maintenance Requests", href: "/maintenance-request" },
        { name: "Add Maintenance Request" },
      ]}
    />
      <DashboardCard title="แก้ไขใบเสร็จรับเงิน/ใบกำกับภาษี">
        <Box mt={3}>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <HeaderForm />
            </Grid2>
            <Grid2 size={12}>
              <NewProductItem isEdit={true} />
            </Grid2>
            <Grid2 size={12}>
              <ProductsServicesList />
            </Grid2>
            <Grid2 size={12}>
              <FooterForm isEdit={true} />
            </Grid2>
          </Grid2>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}

export default EditInvoice;
