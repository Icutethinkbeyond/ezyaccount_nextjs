import React from 'react';
import { NextPage } from 'next';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import Head from 'next/head';

const AwaitingWithdrawal: NextPage = () => {
  const handleWithdraw = () => {
    // Implement withdrawal logic here
    console.log('Withdrawal initiated');
    // You might want to add a state to show a success message or redirect the user
  };

  return (
    <>
      <Head>
        <title>Awaiting Parts Withdrawal - Your App Name</title>
        <meta name="description" content="Awaiting parts withdrawal" />
      </Head>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40vh',
            textAlign: 'center',
          }}
        >
          <CircularProgress size={60} sx={{ mb: 4 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Awaiting Parts Withdrawal
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Your parts are ready for withdrawal.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleWithdraw}
            sx={{ mt: 2 }}
          >
            Withdraw Now
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Click the button above to initiate the withdrawal process.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default AwaitingWithdrawal;