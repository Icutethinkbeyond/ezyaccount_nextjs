"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components
import HeaderForm from "@/components/forms/income/headerForm";
import DashboardCard from "@/components/shared/DashboardCard";
import ProductsServicesList from "@/components/forms/income/productsServicesListForm";
import FooterForm from "@/components/forms/income/footerForm";
import NewProductItem from "@/components/forms/income/newProductItem";
import { Quotation, useDatabaseContext } from "@/contexts/dbContext";
import { useEffect } from "react";
import { useProductServiceListContext } from "@/contexts/productServiceListContext";
import { Product, FormDataFooter } from '../../../../../../contexts/productServiceListContext';

function EditQuotation({ params }: { params: { id: string } }) {
  const { qoutationState } = useDatabaseContext();
  const { setHeadForm, setProducts, setFooterForm } = useProductServiceListContext();

  const findObjectByKeyId = (data: Quotation[], keyId: string) => {
    return data.find((item) => item.keyId === keyId);
  };

  useEffect(() => {
    console.log(params.id);
    const result = findObjectByKeyId(qoutationState, params.id);
    if (result?.headForm && result?.products && result?.summary) {
      const {headForm, products, summary} = result;
      setHeadForm(headForm);
      setProducts(products)
      setFooterForm(summary)
    }
    console.log(result)
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title="New Quotation">
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <HeaderForm />
            </Grid>
            <Grid item xs={12} lg={12}>
              <NewProductItem />
            </Grid>
            <Grid item xs={12} lg={12}>
              <ProductsServicesList />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FooterForm isEdit={true}/>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}

export default EditQuotation;
