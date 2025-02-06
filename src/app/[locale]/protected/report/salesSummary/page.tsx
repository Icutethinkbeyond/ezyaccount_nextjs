"use client";
import * as React from 'react';
import { Grid, Box, Stack, Pagination, Tab } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
import { TabContext, TabList, TabPanel } from '@mui/lab';
// import Tabs from '@mui/material/Tabs';
//component
import SalesSummaryProductTable from "@/components/tables/report/SalesSummaryProductTable";
import SalesSummaryCustomerTable from "@/components/tables/report/SalesSummaryCustomerTable";

const salesSummary = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="SalesSummary" description="this is SalesSummary">
      <Box mt={3}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="ยอดขายตามสินค้า" value="1" />
              <Tab label="ยอดขายตามลูกค้า" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <SalesSummaryProductTable tableName="SalesSummaryProduct Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <SalesSummaryCustomerTable tableName="SalesSummaryCustomer Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
        
      </Box>
    </PageContainer>
  );
};

export default salesSummary;