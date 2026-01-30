"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Divider,
    CircularProgress,
} from "@mui/material";
import PageContainer from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { Save as SaveIcon } from "@mui/icons-material";
import { useNotifyContext } from "@/contexts/NotifyContext";

interface CompanyFormProps {
    title?: string;
    onSuccess?: () => void;
    companyId?: string; // Optional: If provided, Edit Mode. If not, Create Mode.
}

export default function CompanyForm({ title = "ข้อมูลบริษัท", onSuccess, companyId }: CompanyFormProps) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        companyName: "",
        companyTaxId: "",
        companyAddress: "",
        companyPhoneNumber: "",
        companyEmail: "",
        companyWebsite: "",
        companyBusinessType: "",
        companyRegistrationDate: "",
    });

    const { setNotify } = useNotifyContext();

    const showNotification = (message: string, color: "success" | "error") => {
        setNotify({
            open: true,
            message: message,
            color: color,
        });
    };

    useEffect(() => {
        if (companyId) {
            fetchCompanyData(companyId);
        } else {
            setLoading(false); // If creating new, stop loading immediately
        }
    }, [companyId]);

    const fetchCompanyData = async (id: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/companies/${id}`);
            if (res.ok) {
                const data = await res.json();
                const profile = data; // Single object expected from /api/companies/[id]

                if (profile) {
                    setFormData({
                        companyName: profile.companyName || "",
                        companyTaxId: profile.companyTaxId || "",
                        companyAddress: profile.companyAddress || "",
                        companyPhoneNumber: profile.companyPhoneNumber || "",
                        companyEmail: profile.companyEmail || "",
                        companyWebsite: profile.companyWebsite || "",
                        companyBusinessType: profile.companyBusinessType || "",
                        companyRegistrationDate: profile.companyRegistrationDate
                            ? new Date(profile.companyRegistrationDate).toISOString().split('T')[0]
                            : "",
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch company data", error);
            showNotification("Failed to load company data", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const url = companyId ? `/api/companies/${companyId}` : "/api/companies";
            const method = companyId ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                showNotification("บันทึกข้อมูลสำเร็จ", "success");

                // Handle response similarly
                const profile = Array.isArray(data) ? data[0] : data;

                if (profile) {
                    setFormData({
                        companyName: profile.companyName || "",
                        companyTaxId: profile.companyTaxId || "",
                        companyAddress: profile.companyAddress || "",
                        companyPhoneNumber: profile.companyPhoneNumber || "",
                        companyEmail: profile.companyEmail || "",
                        companyWebsite: profile.companyWebsite || "",
                        companyBusinessType: profile.companyBusinessType || "",
                        companyRegistrationDate: profile.companyRegistrationDate
                            ? new Date(profile.companyRegistrationDate).toISOString().split('T')[0]
                            : "",
                    });
                }

                if (onSuccess) {
                    onSuccess();
                }
            } else {
                const errorData = await res.json();
                showNotification(errorData.error || "บันทึกข้อมูลไม่สำเร็จ", "error");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            showNotification("เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <PageContainer title={title} description="Manage company details">
            {/* Header Section */}
            <PageHeader
                title={title}
                actions={
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={saving}
                        sx={{ px: 4 }}
                    >
                        {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                    </Button>
                }
            />

            <Box mt={3}>
                <Card elevation={0} sx={{ border: '1px solid #e5eaef' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h6" sx={{ mb: 1, color: "text.primary", fontWeight: 600 }}>
                            รายละเอียดนิติบุคคล
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            ข้อมูลนี้จะถูกนำไปแสดงในส่วนหัวของเอกสารใบเสนอราคาและใบแจ้งหนี้
                        </Typography>

                        <Divider sx={{ mb: 4 }} />

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="ชื่อบริษัท"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="เช่น บริษัท ตัวอย่าง จำกัด"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="เลขประจำตัวผู้เสียภาษี"
                                    name="companyTaxId"
                                    value={formData.companyTaxId}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="เลข 13 หลัก"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="ที่อยู่"
                                    name="companyAddress"
                                    value={formData.companyAddress}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="เบอร์โทรศัพท์"
                                    name="companyPhoneNumber"
                                    value={formData.companyPhoneNumber}
                                    onChange={handleChange}
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="อีเมล"
                                    name="companyEmail"
                                    value={formData.companyEmail}
                                    onChange={handleChange}
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="เว็บไซต์"
                                    name="companyWebsite"
                                    value={formData.companyWebsite}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="https://www.example.com"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="ประเภทธุรกิจ"
                                    name="companyBusinessType"
                                    value={formData.companyBusinessType}
                                    onChange={handleChange}
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="วันที่จดทะเบียน"
                                    name="companyRegistrationDate"
                                    value={formData.companyRegistrationDate}
                                    onChange={handleChange}
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </PageContainer>
    );
}
