"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    CircularProgress,
    IconButton
} from "@mui/material";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import FormSection from "@/components/shared/FormSection";
import { ArrowBack } from "@mui/icons-material";

import { Product } from "@/interfaces/Product";

const DetailItem = ({ label, value }: { label: string; value: string | number | undefined | null }) => (
    <Box mb={2}>
        <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
            {label}
        </Typography>
        <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 500 }}>
            {value || "-"}
        </Typography>
    </Box>
);

const ViewProductPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/inventory/product/${params.id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
            router.push("/product");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <PageContainer>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                    <CircularProgress />
                </Box>
            </PageContainer>
        );
    }

    if (!product) {
        return (
            <PageContainer>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Typography variant="h6" color="error">ไม่พบข้อมูลสินค้า</Typography>
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => router.push('/product')}>
                        ย้อนกลับ
                    </Button>
                </Box>
            </PageContainer>
        );
    }

    return (
        <PageContainer title="รายละเอียดสินค้า" description="View product details">
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <IconButton
                    onClick={() => router.push('/product')}
                    sx={{
                        ml: -1,
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h3" fontWeight="bold">
                    รายละเอียดสินค้า
                </Typography>
            </Box>

            <Box mt={3}>
                <Card elevation={0} sx={{ border: '1px solid #e5eaef' }}>
                    <CardContent sx={{ p: 4 }}>
                        <FormSection title="ข้อมูลทั่วไป">
                            <Grid container spacing={3} mt={2}>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="ชื่อสินค้า" value={product.productName} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem
                                        label="ราคา"
                                        value={`${Number(product.aboutProduct?.productPrice || 0).toLocaleString("th-TH")} บาท`}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem
                                        label="หน่วย"
                                        value={product.aboutProduct?.unitName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DetailItem
                                        label="รายละเอียดสินค้า"
                                        value={product.productDescription || "ไม่มีรายละเอียด"}
                                    />
                                </Grid>
                            </Grid>
                        </FormSection>
                    </CardContent>
                </Card>
            </Box>
        </PageContainer>
    );
};

export default ViewProductPage;
