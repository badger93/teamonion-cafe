import React, { useState, useEffect } from 'react';
import AdminOrderHistoryPresenter from './AdminOrderHistoryPresenter';
import { getOrderHistory } from '../../../api/adminOrderApi';
import queryString from 'query-string';
import { useTokenCheck } from '../../../utils/tokenCheck';

const AdminOrderHistoryContainer = ({ location }) => {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [pageData, setPageData] = useState({});
  const [queryCategory, setQueryCategory] = useState('');
  const { tokenCheck } = useTokenCheck();

  const getHistoryDataByCategory = (category, page = 0, listSize = 10) => {
    getOrderHistory(category, page, listSize)
      .then(res => {
        const { content, totalPages } = res.data;
        setOrderHistoryData(content);
        setPageData({ page, totalPages });
      })
      .catch(err => {
        tokenCheck(err);
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
