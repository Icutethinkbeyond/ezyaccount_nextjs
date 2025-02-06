"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import UserAndCustomerListsTable from "@/components/tables/user-and-customer/UserListsTable";

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

const userandcustomerlists = () => {


  return (
    <PageContainer title="UserAndCustomerLists" description="this is UserAndCustomerLists">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <UserAndCustomerListsTable tableName="UserListTable" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation"/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default userandcustomerlists;