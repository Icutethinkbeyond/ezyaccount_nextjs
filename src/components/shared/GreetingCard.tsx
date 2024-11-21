import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

interface GreetingCardProps {
  name: string;
}

const GreetingCard: React.FC<GreetingCardProps> = ({ name }) => {
  return (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h6">Hey {name},</Typography>
        <Typography variant="subtitle1">Download Latest Report</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Download
        </Button>
      </Box>
      <Box component="img" src="/path-to-your-image.png" alt="Greeting" sx={{ width: 100, height: 100 }} />
    </Paper>
  );
};

export default GreetingCard;