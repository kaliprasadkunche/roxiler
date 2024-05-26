import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Grid } from '@material-ui/core';

interface Props {
  onChange: (month: string, search: string) => void;
}

const MonthDropdown: React.FC<Props> = ({ onChange }) => {
  const [search, setSearch] = useState('');

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedMonth = event.target.value as string;
    onChange(selectedMonth, search);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearch(searchText);
    onChange('', searchText);
  };

  return (
    <Grid container spacing={2} alignItems="center" style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
      <Grid item>
        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel id="month-label">Month</InputLabel>
          <Select
            labelId="month-label"
            id="month-select"
            onChange={handleMonthChange}
            label="Month"
            defaultValue="01"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const monthNumber = (i + 1).toString().padStart(2, '0');
              const monthName = new Date(2021, i).toLocaleString('en-US', { month: 'long' });
              return (
                <MenuItem key={monthNumber} value={monthNumber}>
                  {monthName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
        />
      </Grid>
    </Grid>
  );
};

export default MonthDropdown;
