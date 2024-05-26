import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/transactions';

export const getTransactions = async (month: string, page: number, search: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?month=${month}&page=${page}&search=${search}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching transactions');
  }
};

export const fetchStats = async (month: string) => {
  const response = await axios.get(`${BASE_URL}/stats?month=${month}`);
  return response.data;
};

export const fetchBarChartData = async (month: string) => {
  const response = await axios.get(`${BASE_URL}/bar-chart?month=${month}`);
  return response.data;
};

export const fetchPieChartData = async (month: string) => {
  const response = await axios.get(`${BASE_URL}/pie-chart?month=${month}`);
  return response.data;
};

export const fetchCombinedData = async (month: string, search: string) => {
  const response = await axios.get(`${BASE_URL}/combined?month=${month}&search=${search}`);
  return response.data;
};
