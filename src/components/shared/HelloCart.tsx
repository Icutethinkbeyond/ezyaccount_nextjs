import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Download } from 'lucide-react';
interface DownloadCardProps {
  name: string;
}
const HelloCard: React.FC<DownloadCardProps> = ({ name }) => {
  return (
    <Card sx={{ bgcolor: '#03C9D7', boxShadow: 3, height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography sx={{ color: "#fff"}} variant="h1" component="div" gutterBottom>
              Hey {name},
            </Typography>
            <Typography sx={{ color: "#fff"}} variant="body1" color="text.secondary">
            Welcome! It looks like you have a lot to manage.
            </Typography>
            {/* <Button
              variant="contained"
              startIcon={<Download />}
              sx={{ mt: 2, bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' } }}
            >
              Download
            </Button> */}
          </Box>
          {/* <Box
            component="img"
            src="/path-to-your-image.png"
            alt="Woman with headset"
            sx={{ width: 150, height: 'auto' }}
          /> */}
        </Box>
      </CardContent>
    </Card>
  );
};
export default HelloCard;