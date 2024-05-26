import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Button } from '@mui/material';
import axios from 'axios';

interface Transaction {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  dateOfSale: string;
  sold: boolean;
}

interface Props {
  month: string;
  search: string;
}

const TransactionsTable: React.FC<Props> = ({ month, search }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState<number>(1);

  const BASE_URL = 'http://localhost:5000/api/transactions';

  const fetchTransactions = async (month: string, search: string, page: number) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: { month, search, page }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions', error);
    }
  };

  useEffect(() => {
    fetchTransactions(month, search, page);
  }, [month, search, page]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="transactions table">
          <TableHead sx={{ backgroundColor: 'black' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Title</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Category</TableCell>
              <TableCell sx={{ color: 'white' }}>Date of Sale</TableCell>
              <TableCell sx={{ color: 'white' }}>Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <TableRow key={transaction.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.price}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.dateOfSale}</TableCell>
                  <TableCell>{transaction.sold ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">No transactions found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <Button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</Button>
        <Button onClick={() => setPage(prev => prev + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default TransactionsTable;
