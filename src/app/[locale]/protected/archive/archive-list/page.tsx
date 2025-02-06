"use client";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
//component
import ArchiveListTable from "@/components/tables/archive/ArchiveListTable";

const addarchive = () => {


  return (
    <PageContainer title="ArchiveList" description="this is ArchiveList">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <ArchiveListTable tableName="ArchiveList Table" newDocumentHref="/income/quotation/new-quotation" newDocumentName="New Quotation" data={[]}/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default addarchive;