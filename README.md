# Roxiler System Assignment - Transaction Dashboard
![MixCollage-26-May-2024-07-33-PM-1513](https://github.com/kaliprasadkunche/roxiler/assets/113325469/a7d3d51e-d088-42a4-b5f6-0c67da713614)

## Project Overview

This project consists of a Transaction Dashboard that includes a frontend and backend implementation. The dashboard displays transactions, provides visual representations of transaction data through bar and pie charts, and shows statistics for a selected month.

## Directory Structure

```
RoxilerSystem
│
├── backend
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── db.sqlite
│   └── ...
│
└── frontend
    ├── public
    │   ├── index.html
    │   ├── favicon.ico
    │   ├── ...
    ├── src
    │   ├── components
    │   │   ├── BarChart.tsx
    │   │   ├── PieChart.tsx
    │   │   ├── Statistics.tsx
    │   │   ├── TransactionsTable.tsx
    │   ├── App.tsx
    │   ├── index.tsx
    │   ├── api.ts
    │   ├── ...
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    └── ...
```

## Features

1. **Transactions Table**: Displays a list of transactions with details such as ID, title, description, price, category, date of sale, and sold status.
2. **Bar Chart**: Visualizes the number of items sold in different price ranges for a selected month.
3. **Pie Chart**: Represents the distribution of items sold across different categories for a selected month.
4. **Statistics**: Provides a summary of the total sale amount, total number of sold items, and total number of not sold items for a selected month.

## Setup Instructions

### Backend

1. **Navigate to the backend directory**:
    ```sh
    cd backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the backend server**:
    ```sh
    node index.js
    ```

### Frontend

1. **Navigate to the frontend directory**:
    ```sh
    cd frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the frontend development server**:
    ```sh
    npm start
    ```

### API Endpoints

#### Transactions

- **GET /transactions**: Fetches a list of transactions.
- **GET /transactions/:month**: Fetches transactions for the specified month.

#### Charts

- **GET /bar-chart**: Fetches bar chart data for the specified month.
- **GET /pie-chart**: Fetches pie chart data for the specified month.

#### Statistics

- **GET /stats**: Fetches statistics for the specified month.

### Example API Request

- **Fetching statistics for a specific month (e.g., January)**:
    ```sh
    GET /stats?month=01
    ```

## Development Notes

- Ensure the backend server is running before starting the frontend development server to avoid API request failures.
- Use appropriate environment variables to manage configurations for different environments (development, production).

Note:

when take repository pls macke sure to install required libraries like ReactMUI, Echarts, Typescript

## Contribution Guidelines

- Fork the repository.
- Create a new branch (`git checkout -b feature/your-feature-name`).
- Commit your changes (`git commit -m 'Add some feature'`).
- Push to the branch (`git push origin feature/your-feature-name`).
- Create a pull request.


## Contact

For any questions or feedback, please contact:
- [Kali Vara Prasad](mailto:kaliprasadkunche@gmail.com)

---

By following the above instructions, you should be able to set up and run the Transaction Dashboard successfully. Happy coding!
