import React, { useState } from 'react';
import { Container, Grid, Typography, Card } from '@material-ui/core';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import MonthDropdown from './components/MonthDropdown';

const App: React.FC = () => {
  const [month, setMonth] = useState<string>('01');
  const [search, setSearch] = useState<string>('');

  const handleFilterChange = (selectedMonth: string, searchText: string) => {
    if (selectedMonth) setMonth(selectedMonth);
    if (searchText !== undefined) setSearch(searchText);
  };

  return (
    <Container style={{ background: 'smokewhite' }}>
      <Card style={{ background: 'black', color: 'white', margin: 'auto', padding: '17px', textAlign: 'center' }}>
        <Typography variant="h3">Transactions Dashboard</Typography>
      </Card>
      <Grid container>
        <Grid container item xs={12}>
          <MonthDropdown onChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" style={{margin:5, fontWeight:'bold'}}>Transaction Table</Typography>
          <TransactionsTable month={month} search={search} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" style={{margin:5, fontWeight:'bold'}}>Statistics</Typography>
          <Statistics month={month} search={search} />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h5" style={{margin:5, fontWeight:'bold'}}>Bar Chart</Typography>
            <Card style={{ boxShadow: '0px 4px 8px rgba(0.5, 0.5, 0.5, 0.5)' }}>
              <BarChart month={month} search={search} />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" style={{margin:5, fontWeight:'bold'}}>Pie Chart</Typography>
            <Card style={{ boxShadow: '0px 4px 8px rgba(0.5, 0.5, 0.5, 0.5)' }}>
              <PieChart month={month} search={search} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
