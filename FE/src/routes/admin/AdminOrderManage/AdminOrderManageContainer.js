import React, { useState, useEffect } from 'react';
import AdminOrderManagePresenter from './AdminOrderManagePresenter';
import { getNonpickupAll } from '../../../api/adminOrderApi';

const AdminOrderManageContainer = () => {
  const [currentOrderList, setCurrentOrderList] = useState([]);
  // 최초 api call
  useEffect(() => {
    getNonpickupAll(setCurrentOrderList);
  }, []);

  return (
    <AdminOrderManagePresenter
      currentOrderList={currentOrderList}
      setCurrentOrderList={setCurrentOrderList}
    />
  );
};

export default AdminOrderManageContainer;
