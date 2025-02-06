'use client'

import { Grid, Box } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
// import SalesOverview from '@/components/dashboard/SalesOverview';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
    <Box mt={3}>
        <Grid item xs={12} lg={12}>
          {/* <SalesOverview /> */}
        </Grid>
    </Box>
  </PageContainer>
  )
}

export default Dashboard;
