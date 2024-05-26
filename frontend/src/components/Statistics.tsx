import React, { useEffect, useState } from 'react';
import { fetchStats } from '../api';
import { Card, Typography } from '@mui/material';  // Make sure you're using the correct import for MUI

interface StatisticsData {
  totalSaleAmount: number;
  totalSoldItems: number;
  totalNotSoldItems: number;
}

interface Props {
  month: string;
  search: string;
}

const Statistics: React.FC<Props> = ({ month, search }) => {
  const [statistics, setStatistics] = useState<StatisticsData>({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await fetchStats(month);
        setStatistics(statsData);
      } catch (error) {
        console.error('Error fetching statistics data:', error);
      }
    };
    fetchData();
  }, [month, search]);

  return (
    <Card style={{width:250, padding:30, textAlign: "left", boxShadow: '0px 4px 8px rgba(0.5, 0.5, 0.5, 0.5)'}}>
      <Typography>Total Sale Amount: {statistics.totalSaleAmount}</Typography>
      <Typography>Total Sold Items: {statistics.totalSoldItems}</Typography>
      <Typography>Total Not Sold Items: {statistics.totalNotSoldItems}</Typography>
    </Card>
  );
};

export default Statistics;
