import React, { useState, useEffect } from 'react';
import AdminOrderManagePresenter from './AdminOrderManagePresenter';
import getNonpickupAll from '../../../api/adminOrderApi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const AdminOrderManageContainer = () => {
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const localToken = localStorage.getItem('TOKEN');
  const sessionToken = sessionStorage.getItem('TOKEN');
  const token = localToken
    ? `Bearer ${localToken}`
    : '' || sessionToken
    ? `Bearer ${sessionToken}`
    : '';
  const client = Stomp.over(new SockJS('/teamonion', null, { Authorization: token }));
  console.log(client);

  const socketOrderInit = () => {
    client.connect({}, frame => {
      alert(`socket conneted: ${frame}`);
      client.subscribe('/topic/order', msg => {
        const res = JSON.parse(msg.body).content;
        console.dir(msg);
        console.dir(res);
        const arrangedItem = {
          order_id: res.orderId,
          menus: res.menuNameList,
          paymentType: res.paymentType,
          paid: res.paid,
          made: res.made,
          pickup: res.pickup,
          createdDate: res.createdDate,
          amount: res.amount,
          member_id: res.buyerId,
        };
        const arrangedList = [...currentOrderList, arrangedItem];
        setCurrentOrderList(arrangedList);
      });
    });
  };
  const socketSetOrderState = ({ order_id, member_id }, change) => {
    const payload = Object.assign({ order_id, buyerId: member_id }, change);

    client.send('/api/orders/update', {}, JSON.stringify(payload));
  };

  const setOrderState = (orderId, stateToSet) => {
    // ex) setOrderState( 주문번호, { made: true } )
    const arrToReplace = currentOrderList.map(item =>
      item.order_id === orderId ? Object.assign(item, stateToSet) : item,
    );
    setCurrentOrderList(arrToReplace);
  };

  // 최초 api call
  useEffect(() => {
    getNonpickupAll(setCurrentOrderList);
    socketOrderInit();
    return () => {
      client.disconnect(() => {
        alert('socket disconnected!');
      });
    };
  }, []);

  return (
    <AdminOrderManagePresenter
      currentOrderList={currentOrderList}
      setCurrentOrderList={setOrderState}
      socketSetOrderState={socketSetOrderState}
    />
  );
};

export default AdminOrderManageContainer;
