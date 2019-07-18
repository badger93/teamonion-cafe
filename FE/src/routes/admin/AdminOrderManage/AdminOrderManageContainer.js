import React, { useState, useEffect } from 'react';
import AdminOrderManagePresenter from './AdminOrderManagePresenter';
import { getNonpickupAll } from '../../../api/adminOrderApi';

const AdminOrderManageContainer = () => {
  const [currentOrderList, setCurrentOrderList] = useState([]);

  // 최초 api call
  useEffect(() => {
    getNonpickupAll(setCurrentOrderList);
    console.log(currentOrderList);
  }, []);

  return (
    <AdminOrderManagePresenter
      currentOrder={currentOrderList}
      setCurrentOrder={setCurrentOrderList}
    />
  );
};

export default AdminOrderManageContainer;
