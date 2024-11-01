import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { HandCoins } from 'lucide-react';
interface EarningsCardProps {
  amount: number;
  label: string;
}
const EarningsCard: React.FC<EarningsCardProps> = ({ amount, label }) => {
  return (
    <Card sx={{ height: '100%', bgcolor: '#3b5094', color: 'white' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            Earnings
          </Typography>
          <Box
            sx={{
              bgcolor: '#60a5fa',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <HandCoins size={24} />
          </Box>
        </Box>
        <Typography variant="h4" component="div" sx={{ mt: 2, mb: 1 }}>
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.7 }}>
          {label}
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.5, mt:2 }}>
        This income comes from renting out equipment.
        </Typography>
      </CardContent>
    </Card>
  );
};
export default EarningsCard;