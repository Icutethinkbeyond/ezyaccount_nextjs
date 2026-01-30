"use client";

import { useState, useEffect } from "react";
import { Box, Button, Typography, Grid2, Paper, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import { ArrowBack, Edit } from "@mui/icons-material";

const ViewProductPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        fetchProduct();
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
                <DashboardCard title="ข้อมูลสินค้า">
                    <Box sx={{ p: 3, textAlign: "center" }}>
                        กำลังโหลดข้อมูล...
                    </Box>
                </DashboardCard>
            </PageContainer>
        );
    }

    if (!product) {
        return (
            <PageContainer>
                <DashboardCard title="ข้อมูลสินค้า">
                    <Box sx={{ p: 3, textAlign: "center" }}>
                        ไม่พบข้อมูลสินค้า
                    </Box>
                </DashboardCard>
            </PageContainer>
        );
    }

    const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
        <Box sx={{ py: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {value || "-"}
            </Typography>
        </Box>
    );

    return (
        <PageContainer>
            <DashboardCard title="ข้อมูลสินค้า">
                <Box sx={{ p: 3 }}>
                    {/* Header Actions */}
                    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() => router.back()}
                        >
                            ย้อนกลับ
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={() => router.push(`/product/edit/${params.id}`)}
                        >
                            แก้ไขสินค้า
                        </Button>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Product Information - Essential Fields Only */}
                    <Grid2 container spacing={3}>
                        {/* ชื่อสินค้า */}
                        <Grid2 size={12}>
                            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                                <InfoRow label="ชื่อสินค้า" value={product.productName} />
                            </Paper>
                        </Grid2>

                        {/* รายละเอียด */}
                        <Grid2 size={12}>
                            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    รายละเอียดสินค้า
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        whiteSpace: "pre-wrap",
                                        minHeight: "60px"
                                    }}
                                >
                                    {product.productDescription || "ไม่มีรายละเอียด"}
                                </Typography>
                            </Paper>
                        </Grid2>

                        {/* ราคาและหน่วย */}
                        <Grid2 size={6}>
                            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                                <InfoRow
                                    label="ราคา"
                                    value={`${Number(product.aboutProduct?.productPrice || 0).toLocaleString("th-TH")} บาท`}
                                />
                            </Paper>
                        </Grid2>

                        <Grid2 size={6}>
                            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                                <InfoRow
                                    label="หน่วย"
                                    value={product.aboutProduct?.unitName || "ชิ้น"}
                                />
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Box>
            </DashboardCard>
        </PageContainer>
    );
};

export default ViewProductPage;
