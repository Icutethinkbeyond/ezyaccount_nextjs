"use client";

import React from "react";
import { Box } from "@mui/material";
import PageContainer from "@/components/shared/PageContainer";
import CompanyTable from "@/components/forms/company/CompanyTable";

export default function CompanyListPage() {
    return (
        <PageContainer title="Company Information" description="List of companies">
            <Box mt={3}>
                <CompanyTable />
            </Box>
        </PageContainer>
    );
}
