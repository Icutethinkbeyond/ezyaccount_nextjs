"use client";
import { useEffect, useState } from "react";
import { Box, Button, Container, CircularProgress, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InvoicePrintPage from "@/components/forms/pricing-table/InvoicePrint";
import { usePricingContext } from "@/contexts/PricingContext";
import { useQuotationListContext } from "@/contexts/QuotationContext";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";

export default function QuotationPreviewPage({ params }: { params: { id: string } }) {
    const { loadData } = usePricingContext();
    const { headForm, setHeadForm } = useQuotationListContext();
    const { setBreadcrumbs } = useBreadcrumbContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setBreadcrumbs([
            { name: "หน้าแรก", href: `/` },
            { name: "ใบเสนอ", href: `/quotation` },
            { name: "ตัวอย่างใบเสนอราคา" },
        ]);
        return () => {
            setBreadcrumbs([]);
        };
    }, [ setBreadcrumbs]);

    useEffect(() => {
        const fetchQuotationData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/income/quotation/${params.id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch quotation');
                }

                const quotation = await response.json();
                console.log("✅ Loaded quotation data for preview:", quotation);

                // แปลงข้อมูล categories เป็น format ของ PricingContext
                const categories = quotation.categories?.map((cat: any, catIndex: number) => {
                    return {
                        id: `category-${catIndex + 1}`,
                        name: cat.name,
                        subItems: cat.items?.map((item: any, itemIndex: number) => ({
                            id: `item-${catIndex + 1}-${itemIndex + 1}`,
                            name: item.name || "",
                            description: item.description,
                            unit: item.unit || "ชิ้น",
                            qty: item.qty,
                            pricePerUnit: item.pricePerUnit,
                            remark: item.remark || "",
                        })) || [],
                    };
                }) || [];

                // โหลดข้อมูลเข้า PricingContext
                loadData(
                    categories,
                    quotation.globalDiscount || 0,
                    quotation.includeVat || false
                );

                // โหลดข้อมูลบริษัทและผู้ติดต่อ
                setHeadForm({
                    quotationNumber: quotation.documentIdNo || "",
                    companyName: quotation.customerCompany?.companyName || "",
                    companyTel: quotation.customerCompany?.companyTel || "",
                    contactorName: quotation.contactor?.contactorName || "",
                    contactorTel: quotation.contactor?.contactorTel || "",
                    companyAddress: quotation.customerCompany?.companyAddress || "",
                    contactorAddress: quotation.contactor?.contactorAddress || "",
                    contactorEmail: quotation.contactor?.contactorEmail || "",
                    taxId: quotation.customerCompany?.taxId || "",
                    branch: quotation.customerCompany?.branch || "",
                    dateCreate: quotation.documentCreateDate
                        ? new Date(quotation.documentCreateDate).toISOString().split('T')[0]
                        : "",
                    includeTax: quotation.includeVat || false,
                    note: quotation.note || "",
                });

            } catch (error) {
                console.error("❌ Error loading quotation:", error);
                alert("ไม่สามารถโหลดข้อมูลใบเสนอราคาได้");
                router.push(`/quotation`);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchQuotationData();
        }
    }, [params.id, router]); // Reduced dependencies to prevent infinite loop

    const handlePrint = () => {
        window.print();
    };

    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <PageContainer title="กำลังโหลด..." description="">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', gap: 2 }}>
                    <CircularProgress />
                    <Typography>กำลังโหลดข้อมูล...</Typography>
                </Box>
            </PageContainer>
        );
    }

    return (
        <Box
            sx={{
                "@media print": {
                    "& .no-print": {
                        display: "none",
                    },
                },
            }}
        >
            <Container maxWidth="md" className="no-print" sx={{ py: 3, display: 'flex', gap: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                >
                    กลับ
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                >
                    พิมพ์ใบเสนอราคา
                </Button>
            </Container>
            <InvoicePrintPage
                invoiceNumber={headForm.quotationNumber}
                invoiceDate={headForm.dateCreate}
                billTo={{
                    name: headForm.contactorName,
                    position: "",
                    company: headForm.companyName,
                    phone: headForm.contactorTel,
                    email: headForm.contactorEmail,
                }}
            />
        </Box>
    );
}
