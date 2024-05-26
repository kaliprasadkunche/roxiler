const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/transactions.db');

router.get('/', (req, res) => {
  const { month, page = 1, search = '' } = req.query;
  if (!month) {
    return res.status(400).send('Month is required');
  }
  const offset = (page - 1) * 10;

  const paddedMonth = month.padStart(2, '0');
  const query = `
    SELECT *
    FROM transactions
    WHERE dateOfSale LIKE '%-${paddedMonth}-%'
    AND (title LIKE '%${search}%' OR description LIKE '%${search}%' OR CAST(price AS TEXT) LIKE '%${search}%')
    LIMIT 10
    OFFSET ${offset}
  `;
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching transactions');
    } else {
      res.json(rows);
    }
  });
});

router.get('/stats', (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).send('Month is required');
  }
  const paddedMonth = month.padStart(2, '0');
  const query = `
    SELECT
      SUM(price) AS totalSaleAmount,
      SUM(CASE WHEN sold = true THEN 1 ELSE 0 END) AS totalSoldItems,
      SUM(CASE WHEN sold = false THEN 1 ELSE 0 END) AS totalNotSoldItems
    FROM transactions 
    WHERE dateOfSale LIKE '%-${paddedMonth}-%'
  `;

  db.get(query, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching statistics');
    } else {
      res.json(row);
    }
  });
});

router.get('/bar-chart', (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).send('Month is required');
  }
  const paddedMonth = month.padStart(2, '0');
  const query = `
    SELECT
      CASE
        WHEN price >= 1 AND price <= 100 THEN '1-100'
        WHEN price >= 101 AND price <= 200 THEN '101-200'
        WHEN price >= 201 AND price <= 300 THEN '201-300'
        WHEN price >= 301 AND price <= 400 THEN '301-400'
        WHEN price >= 401 AND price <= 500 THEN '401-500'
        WHEN price >= 501 AND price <= 600 THEN '501-600'
        WHEN price >= 601 AND price <= 700 THEN '601-700'
        WHEN price >= 701 AND price <= 800 THEN '701-800'
        WHEN price >= 801 AND price <= 900 THEN '801-900'
        -- Define other price ranges...
      END AS priceRange,
      COUNT(*) AS itemCount
    FROM transactions
    WHERE dateOfSale LIKE '%-${paddedMonth}-%'
    GROUP BY priceRange
  `;
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching bar chart data');
    } else {
      res.json(rows);
    }
  });
});

router.get('/pie-chart', (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).send('Month is required');
  }
  const paddedMonth = month.padStart(2, '0');
  const query = `
    SELECT category, COUNT(*) AS itemCount
    FROM transactions
    WHERE dateOfSale LIKE '%-${paddedMonth}-%'
    GROUP BY category
  `;
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching pie chart data');
    } else {
      res.json(rows);
    }
  });
});

router.get('/combined', (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).send('Month is required');
  }
  const paddedMonth = month.padStart(2, '0');
  const query = `
    SELECT *
    FROM transactions
    WHERE dateOfSale LIKE '%-${paddedMonth}-%'
  `;
  db.all(query, (err, transactions) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching transactions');
    } else {
      const statsQuery = `
        SELECT
          SUM(CASE WHEN sold = 1 THEN price ELSE 0 END) AS totalSaleAmount,
          SUM(CASE WHEN sold = 1 THEN 1 ELSE 0 END) AS totalSoldItems,
          SUM(CASE WHEN sold = 0 THEN 1 ELSE 0 END) AS totalNotSoldItems
        FROM transactions
        WHERE dateOfSale LIKE '%-${paddedMonth}-%'
      `;
      db.get(statsQuery, (err, stats) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching statistics');
        } else {
          const barChartQuery = `
            SELECT
              CASE
                WHEN price >= 0 AND price <= 100 THEN '0-100'
                WHEN price >= 101 AND price <= 200 THEN '101-200'
                -- Define other price ranges...
              END AS priceRange,
              COUNT(*) AS itemCount
            FROM transactions
            WHERE dateOfSale LIKE '%-${paddedMonth}-%'
            GROUP BY priceRange
          `;
          db.all(barChartQuery, (err, barChartData) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error fetching bar chart data');
            } else {
              const pieChartQuery = `
              SELECT category, COUNT(*) AS itemCount
              FROM transactions
              WHERE dateOfSale LIKE '%-${paddedMonth}-%'
              GROUP BY category
            `;
            db.all(pieChartQuery, (err, pieChartData) => {
              if (err) {
                console.error(err);
                res.status(500).send('Error fetching pie chart data');
              } else {
                res.json({
                  transactions,
                  stats,
                  barChartData,
                  pieChartData
                });
              }
            });
          }
        });
      }
    });
  }
});
});

module.exports = router;

