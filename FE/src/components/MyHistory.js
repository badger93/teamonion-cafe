import React from 'react';
import ReactDataGrid from 'react-data-grid';

const MyHistory = ({ columns, rows = [] }) => (
  <ReactDataGrid
    columns={columns}
    rowGetter={i => rows[i]}
    rowsCount={rows.length}
    minHeight={400}
    isScrolling={true}
  />
);

export default MyHistory;
