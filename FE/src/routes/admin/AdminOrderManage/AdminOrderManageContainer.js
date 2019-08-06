import React, { useState, useEffect } from 'react';
import AdminOrderManagePresenter from './AdminOrderManagePresenter';
import getNonpickupAll from '../../../api/adminOrderApi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const AdminOrderManageContainer = () => {
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const [arrangedItem, setArrangedItem] = useState(null);
  const localToken = localStorage.getItem('TOKEN');
  const sessionToken = sessionStorage.getItem('TOKEN');
  const token = localToken
    ? `Bearer ${localToken}`
    : '' || sessionToken
    ? `Bearer ${sessionToken}`
    : '';

  //const sockJsProtocols = ['xhr-streaming', 'xhr-polling'];
  const client = Stomp.over(
    new SockJS('/teamonion', null, {
      // transports: sockJsProtocols,
    }),
  );

  const socketOrderInit = () => {
    client.connect({ Authorization: token }, frame => {
      //상태변경 구독
      client.subscribe('/queue/orders/update', msg => {
        const res = JSON.parse(msg.body);
        setArrangedItem({
          order_id: res.id,
          paid: res.paid,
          made: res.made,
          pickup: res.pickup,
          member_id: res.buyerId,
        });
      });
      // 주문추가 구독
      client.subscribe('/topic/orders/add', msg => {
        const res = JSON.parse(msg.body);
        setArrangedItem({
          order_id: res.id,
          menus: res.menuNameList,
          paymentType: res.paymentType,
          paid: res.paid,
          made: res.made,
          pickup: res.pickup,
          createdDate: res.createdDate,
          amount: res.amount,
          member_id: res.buyerId,
        });
      });
    });
  };

  const socketSetOrderState = async ({ order_id, member_id, made, paid, pickup }, change) => {
    const payload = Object.assign({ id: order_id, buyerId: member_id, made, paid, pickup }, change);
    try {
      await client.send('/api/orders/update', {}, JSON.stringify(payload));
    } catch (err) {
      alert('연결 없음');
      await socketOrderInit();
    }
  };

  // 최초 api call
  useEffect(() => {
    const socketInit = async () => {
      try {
        await getNonpickupAll(setCurrentOrderList);
        await socketOrderInit();
      } catch (err) {
        console.log(err);
      }
    };
    socketInit();
    return () => {
      client.disconnect(() => {});
    };
  }, []);

  // 변경된 아이템이 감지되면 렌더하기 위한 코드
  useEffect(() => {
    // 수정
    if (arrangedItem) {
      const arrangedList = currentOrderList.map(item =>
        item.order_id == arrangedItem.order_id ? { ...item, ...arrangedItem } : item,
      );
      setCurrentOrderList(arrangedList);
    }
    // 추가
    if (arrangedItem && arrangedItem.menus) {
      const arrangedList = currentOrderList.concat(arrangedItem);
      setCurrentOrderList(arrangedList);
    }
  }, [arrangedItem]);

  return (
    <AdminOrderManagePresenter
      currentOrderList={currentOrderList}
      socketSetOrderState={socketSetOrderState}
    />
  );
};

export default AdminOrderManageContainer;
