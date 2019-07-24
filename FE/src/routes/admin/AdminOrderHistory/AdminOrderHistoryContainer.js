import React, { useState, useEffect } from 'react';
import AdminOrderHistoryPresenter from './AdminOrderHistoryPresenter';
import { getOrderHistory } from '../../../api/adminOrderApi';

const AdminOrderHistoryContainer = () => {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const getHistoryDataByState = (state) => {
    getOrderHistory()
      .then((res) => {
        setOrderHistoryData(res.data);
      })
      .catch((err) => {
        alert(`주문이력 가져오기 실패: ${err}`);
      });
  };

  useEffect(() => {
    getOrderHistory()
      .then((res) => {
        setOrderHistoryData(res.data);
      })
      .catch((err) => {
        alert(`주문이력 가져오기 실패: ${err}`);
      });
  }, []);

  return (
    <AdminOrderHistoryPresenter
      orderHistoryData={orderHistoryData}
      getHistoryDataByState={getHistoryDataByState}
    />
  );
};

export default AdminOrderHistoryContainer;
