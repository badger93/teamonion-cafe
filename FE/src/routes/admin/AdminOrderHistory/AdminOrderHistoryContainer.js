import React, { useState, useEffect } from 'react';
import AdminOrderHistoryPresenter from './AdminOrderHistoryPresenter';
import { getOrderHistory } from '../../../api/adminOrderApi';
import queryString from 'query-string';

const AdminOrderHistoryContainer = ({ location }) => {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [pageData, setPageData] = useState({});
  const [queryCategory, setQueryCategory] = useState('');

  const getHistoryDataByCategory = (category, page = 0, listSize = 10) => {
    getOrderHistory(category, page, listSize)
      .then(res => {
        const { content, totalPages } = res.data;
        setOrderHistoryData(content);
        setPageData({ page, totalPages });
      })
      .catch(err => {
        // alert(`주문이력 가져오기 실패: ${err}`);
      });
  };

  useEffect(() => {
    const query = queryString.parse(location.search);
    setQueryCategory(query.category);
    if (query.category) {
      getHistoryDataByCategory(query.category);
    }
  }, [location.search]);

  return (
    <AdminOrderHistoryPresenter
      orderHistoryData={orderHistoryData}
      getHistoryDataByCategory={getHistoryDataByCategory}
      pageData={pageData}
      queryCategory={queryCategory}
    />
  );
};

export default AdminOrderHistoryContainer;
