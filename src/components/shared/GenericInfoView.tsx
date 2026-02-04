"use client";

import React from "react";
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

export type ViewStatus = 'loading' | 'error' | 'notFound' | 'ready';

export interface FieldConfig<T> {
    label: string;
    key: keyof T | string;
    format?: (value: any) => string;
}

interface GenericInfoViewProps<T> {
    title: string;
    backPath: string;
    data: T | null;
    fields: FieldConfig<T>[];
    status: ViewStatus;
    errorMessage?: string;
    notFoundMessage?: string;
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

export function GenericInfoView<T>({
    title,
    backPath,
    data,
    fields,
    status,
    errorMessage = "Cannot load data",
    notFoundMessage = "Data not found",
}: GenericInfoViewProps<T>) {
    const router = useRouter();

    if (status === 'loading') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (status === 'error' || status === 'notFound' || !data) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6" color="error">
                    {status === 'notFound' ? notFoundMessage : errorMessage}
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => router.push(backPath)}>
                    Back
                </Button>
            </Box>
        );
    }

    // Helper to access nested properties if needed, though for now simple key access is enough
    const getValue = (item: T, field: FieldConfig<T>) => {
        const val = (item as any)[field.key];
        if (field.format) {
            return field.format(val);
        }
        return val;
    };

    return (
        <PageContainer title={title} description={`View ${title}`}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <IconButton
                    onClick={() => router.push(backPath)}
                    sx={{
                        ml: -1,
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h3" fontWeight="bold">
                    {title}
                </Typography>
            </Box>

            <Box mt={3}>
                <Card elevation={0} sx={{ border: '1px solid #e5eaef' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                overflow: 'hidden',
                                mb: 2,
                                border: '1px solid #e5eaef',
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: '#e5fafb',
                                    borderBottom: '2px solid #03c9d7',
                                    padding: '16px 24px',
                                }}
                            >
                                <Typography variant="h6" fontWeight={600} color="#2A3547">
                                    ข้อมูลทั่วไป
                                </Typography>
                            </Box>
                            <Box p={3}>
                                <Grid container spacing={3}>
                                    {fields.map((field, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <DetailItem
                                                label={field.label}
                                                value={getValue(data, field)}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </PageContainer>
    );
}

export default GenericInfoView;
