import React, { useState, useEffect } from 'react';
import AdminOrderHistoryPresenter from './AdminOrderHistoryPresenter';
import { getOrderHistory } from '../../../api/adminOrderApi';

const AdminOrderHistoryContainer = () => {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const getHistoryDataByCategory = category => {
    getOrderHistory(category)
      .then(res => {
        setOrderHistoryData(res.data.container);
      })
      .catch(err => {
        alert(`주문이력 가져오기 실패: ${err}`);
      });
  };

  useEffect(() => {
    getHistoryDataByState('ALL');
  }, []);

  return (
    <AdminOrderHistoryPresenter
      orderHistoryData={orderHistoryData}
      getHistoryDataByCategory={getHistoryDataByCategory}
    />
  );
};

export default AdminOrderHistoryContainer;
