import React from 'react';
import { Paper, Typography, Box, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface TotalFixCardProps {
  sales: number;
}

const TotalFixCard: React.FC<TotalFixCardProps> = ({ sales }) => {
  const [month, setMonth] = React.useState('March 2024');

  const data = [
    { name: '2024', value: 60 },
    { name: '2023', value: 30 },
    { name: '2022', value: 10 },
  ];

  const COLORS = ['#00e5ff', '#ff9f87', '#ffeb3b'];

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Total Sales</Typography>
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          size="small"
        >
          <MenuItem value="March 2024">March 2024</MenuItem>
          <MenuItem value="April 2024">April 2024</MenuItem>
        </Select>
      </Box>
      <Typography variant="subtitle1">Sales Yearly</Typography>
      <Typography variant="h4">{sales.toLocaleString()}</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {data.map((entry, index) => (
          <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Box sx={{ width: 10, height: 10, bgcolor: COLORS[index], mr: 1 }} />
            <Typography variant="caption">{entry.name}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default TotalFixCard;