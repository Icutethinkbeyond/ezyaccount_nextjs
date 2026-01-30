"use client";

import { Grid2, Box } from "@mui/material";
import ProductsTable from "@/components/product/ProductsTable";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PageContainer from "@/components/shared/PageContainer";

const ProductPage = () => {
    const router = useRouter();

    return (
        <PageContainer title="Product" description="">
            <Box mt={3}>
                <Grid2 container spacing={3}>
                    <Grid2 size={12}>
                        <ProductsTable />
                    </Grid2>
                </Grid2>
            </Box>
        </PageContainer>
    );
};

export default ProductPage;
