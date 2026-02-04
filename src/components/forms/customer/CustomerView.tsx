"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Button,
    CircularProgress,
    IconButton,
} from "@mui/material";
import PageContainer from "@/components/shared/PageContainer";
import FormSection from "@/components/shared/FormSection";
import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";
import { Customer } from "@/interfaces/Customer";

interface CustomerViewProps {
    customerId: string;
}

const DetailItem = ({ label, value }: { label: string; value: string | undefined | null }) => (
    <Box mb={2}>
        <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
            {label}
        </Typography>
        <Typography variant="body1" color="textPrimary">
            {value || "-"}
        </Typography>
    </Box>
);

export default function CustomerView({ customerId }: CustomerViewProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Customer | null>(null);

    useEffect(() => {
        if (customerId) {
            fetchCustomerData(customerId);
        }
    }, [customerId]);

    const fetchCustomerData = async (id: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/customer/${id}`);
            if (res.ok) {
                const result: Customer = await res.json();
                setData(result);
            }
        } catch (error) {
            console.error("Failed to fetch customer data", error);
            alert("Failed to load customer data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6" color="error">ไม่พบข้อมูลลูกค้า</Typography>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => router.back()}>
                    ย้อนกลับ
                </Button>
            </Box>
        );
    }

    return (
        <PageContainer title="รายละเอียดลูกค้า" description="View customer details">
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <IconButton
                    onClick={() => router.push('/customer')}
                    sx={{
                        ml: -1,
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h3" fontWeight="bold">
                    รายละเอียดลูกค้า
                </Typography>
            </Box>

            <Box mt={3}>
                <Card elevation={0} sx={{ border: '1px solid #e5eaef' }}>
                    <CardContent sx={{ p: 4 }}>
                        <FormSection title="ข้อมูลทั่วไป">
                            <Grid container spacing={3} mt={2}>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="ชื่อผู้ติดต่อ" value={data.contactorName} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="เบอร์โทรศัพท์" value={data.contactorTel} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="อีเมล" value={data.contactorEmail} />
                                </Grid>
                                <Grid item xs={12}>
                                    <DetailItem label="ที่อยู่" value={data.contactorAddress} />
                                </Grid>
                            </Grid>
                        </FormSection>
                    </CardContent>
                </Card>
            </Box>
        </PageContainer>
    );
}
