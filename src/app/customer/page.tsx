"use client";

import { Grid2, Box } from "@mui/material";
import CustomersTable from "@/components/forms/customer/CustomersTable";
import PageContainer from "@/components/shared/PageContainer";

const CustomerPage = () => {
    return (
        <PageContainer title="ข้อมูลลูกค้า" description="">
            <Box mt={3}>
                <Grid2 container spacing={3}>
                    <Grid2 size={12}>
                        <CustomersTable />
                    </Grid2>
                </Grid2>
            </Box>
        </PageContainer>
    );
};

export default CustomerPage;
