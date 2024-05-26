import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { fetchPieChartData } from '../api';
import { EChartsOption } from 'echarts';

interface PieChartData {
  category: string;
  itemCount: number;
}

interface Props {
  month: string;
  search: string;
}

const PieChart: React.FC<Props> = ({ month, search }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PieChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pieChartData = await fetchPieChartData(month);
        setData(pieChartData);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };
    fetchData();
  }, [month, search]);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      const option: EChartsOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data.map(item => ({
              value: item.itemCount,
              name: item.category
            }))
          }
        ]
      };

      myChart.setOption(option as any);

      return () => {
        myChart.dispose();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: 400, margin:20 }} />;
};

export default PieChart;
