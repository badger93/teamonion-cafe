import React from 'react';
import ReactDataGrid from 'react-data-grid';

const MyHistory = ({ columns, rows = [] }) => (
  <ReactDataGrid
    columns={columns}
    rowGetter={(i) => rows[i]}
    rowsCount={3}
    minHeight={150}
    isScrolling
  />
);

export default MyHistory;
