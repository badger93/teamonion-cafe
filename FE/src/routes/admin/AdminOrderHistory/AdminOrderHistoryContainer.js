import React, { useState, useEffect } from 'react';
import AdminOrderHistoryPresenter from './AdminOrderHistoryPresenter';
import { getOrderHistory } from '../../../api/adminOrderApi';

const AdminOrderHistoryContainer = () => {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [pageData, setPageData] = useState([]);

  const getHistoryDataByCategory = (category, page = 0, listSize = 10) => {
    getOrderHistory(category, page, listSize)
      .then(res => {
        const { content, totalPages, size } = res.data;
        setOrderHistoryData(content);
        setPageData({ page, totalPages, itemSize: size });
      })
      .catch(err => {
        alert(`주문이력 가져오기 실패: ${err}`);
      });
  };

  useEffect(() => {
    getHistoryDataByCategory('ALL');
  }, []);

  return (
    <AdminOrderHistoryPresenter
      orderHistoryData={orderHistoryData}
      getHistoryDataByCategory={getHistoryDataByCategory}
      pageData={pageData}
    />
  );
};

export default AdminOrderHistoryContainer;
