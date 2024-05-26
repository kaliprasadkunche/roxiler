import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts'; 
import { EChartsOption } from 'echarts'; 
import { fetchBarChartData } from '../api';

interface BarChartData {
  priceRange: string;
  itemCount: number;
}

interface Props {
  month: string; 
  search: string
}

const BarChart: React.FC<Props> = ({ month, search }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<BarChartData[]>([]);
  console.log('data',data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barChartData = await fetchBarChartData(month);
        setData(barChartData);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };
    fetchData();
  }, [month,search]);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      const option = {
        tooltip: {},
        xAxis: {
            type: 'category',
            data: data.map(item => item.priceRange),
        },
        yAxis: {
            type: 'value',
            axisLine: {
              show: true
          }
        },
        series: [
            {
                data: data.map(item => item.itemCount),
                type: 'bar',
                barWidth: '30%',
                itemStyle: {
                    borderRadius: [15, 15, 0, 0]
                }
            },
        ],
    };

      myChart.setOption(option as any);

      return () => {
        myChart.dispose();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: 400, margin:20 }} />;
};

export default BarChart;