"use client";
import { Grid2, Box, Stack, Pagination } from "@mui/material";
import QuotationsTable from "@/components/tables/income/QuotationsTable";
import PageContainer from "@/components/shared/PageContainer";
import { useEffect } from "react";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";

const data = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
  },
];

const Dashboard = () => {

    const { setBreadcrumbs } = useBreadcrumbContext();

    useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: "/dashboard" },
      { name: "คลังอุปกรณ์", href: "/inventory" },
      { name: "เพิ่มอุปกรณ์ใหม่" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            {/* <QuotationsTable  tableName="Quotation Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/> */}
            <QuotationsTable />
          </Grid2>
        </Grid2>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
