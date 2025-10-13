"use client";

import { Grid2, Box } from "@mui/material";
import QuotationsTable from "@/components/tables/income/QuotationsTable";
import PageContainer from "@/components/shared/PageContainer";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import FloatingButton from "@/components/shared/FloatingButton";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const localActive = useLocale();

    const { setBreadcrumbs } = useBreadcrumbContext();

    useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: `/${localActive}/protected/dashboard` },
      { name: "ใบเสนอ", href: `/${localActive}/protected/income/quotation` },
      { name: "เพิ่มใบเสนอราคาใหม่" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  return (
    <PageContainer title="Quotation" description="">
      <FloatingButton
        onClick={() => router.push(`/${localActive}/protected/income/quotation/new-quotation`)}
      />
      <Box mt={3}>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <QuotationsTable />
          </Grid2>
        </Grid2>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
