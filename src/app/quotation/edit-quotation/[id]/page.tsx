"use client";

import { Grid2, Box } from "@mui/material";
import PageContainer from "@/components/shared/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";
import PricingTable from "@/components/forms/pricing-table/PricingTable";
import PricingSummary from "@/components/forms/pricing-table/PricingSummary";
import { useEffect, useState } from "react";
import { usePricingContext } from "@/contexts/PricingContext";
import { useQuotationListContext } from "@/contexts/QuotationContext";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import { useRouter } from "next/navigation";
import HeaderEditForm from "@/components/forms/income/HeaderEditForm";

function EditQuotation({ params }: { params: { id: string } }) {
  const { loadData } = usePricingContext();
  const { setHeadForm } = useQuotationListContext();
  const { setBreadcrumbs } = useBreadcrumbContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: `/` },
      { name: "ใบเสนอ", href: `/quotation` },
      { name: "แก้ไขใบเสนอราคา" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  useEffect(() => {
    const fetchQuotationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/income/quotation/${params.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch quotation');
        }

        const quotation = await response.json();
        console.log("✅ Loaded quotation data for edit:", quotation);

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

        console.log("📦 Transformed categories:", categories);

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

        console.log("✅ Data loaded successfully!");

      } catch (error) {
        console.error("❌ Error loading quotation:", error);
        alert("ไม่สามารถโหลดข้อมูลใบเสนอราคาได้");
        router.push(`/income/quotation`);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchQuotationData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <PageContainer title="กำลังโหลด..." description="">
        <Box sx={{ textAlign: 'center', padding: '50px' }}>
          กำลังโหลดข้อมูล...
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <DashboardCard title="แก้ไขใบเสนอราคา">
        <Grid2 container spacing={3} sx={{ p: 3 }}>
          <Grid2 size={12}>
            <HeaderEditForm />
          </Grid2>
          <Grid2 size={12}>
            <PricingTable />
          </Grid2>
          <Grid2 container size={12}>
            <Grid2 size={6}>
            </Grid2>
            <Grid2 size={6}>
              <PricingSummary isEdit={true} quotationId={params.id} />
            </Grid2>
          </Grid2>
        </Grid2>
      </DashboardCard>
    </PageContainer>
  );
}

export default EditQuotation;
