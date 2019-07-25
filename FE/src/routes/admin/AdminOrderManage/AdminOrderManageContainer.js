import React, { useState, useEffect } from 'react';
import AdminOrderManagePresenter from './AdminOrderManagePresenter';
import getNonpickupAll from '../../../api/adminOrderApi';

const AdminOrderManageContainer = () => {
  const [currentOrderList, setCurrentOrderList] = useState([]);
  // 최초 api call
  useEffect(() => {
    getNonpickupAll(setCurrentOrderList);
  }, []);

  const setOrderState = (orderId, stateToSet) => {
    // ex) setOrderState( 주문번호, { made: true } )
    const arrToReplace = currentOrderList.map((item) =>
      item.order_id === orderId ? Object.assign(item, stateToSet) : item,
    );
    setCurrentOrderList(arrToReplace);
  };

  return (
    <AdminOrderManagePresenter
      currentOrderList={currentOrderList}
      setCurrentOrderList={setOrderState}
    />
  );
};

export default AdminOrderManageContainer;
