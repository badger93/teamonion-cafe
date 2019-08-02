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
  const sockJsProtocols = ['xhr-streaming', 'xhr-polling'];
  const client = Stomp.over(
    new SockJS('http://teamonion-idev.tmon.co.kr/teamonion', null, {
      headers: {
        Authorization: token,
        transports: sockJsProtocols,
      },
    }),
  );

  const socketOrderInit = () => {
    console.log('Hi order man');
    client.connect({}, frame => {
      client.subscribe('/topic/order', msg => {
        console.log(msg);
        const res = JSON.parse(msg.body);
        const aitem = {
          order_id: res.id,
          paid: res.paid,
          made: res.made,
          pickup: res.pickup,
          member_id: res.buyerId,
        };
        setArrangedItem(aitem);
      });
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
  const socketSetOrderState = ({ order_id, member_id, made, paid, pickup }, change) => {
    const payload = Object.assign({ id: order_id, buyerId: member_id, made, paid, pickup }, change);
    console.log(payload);
    if (client) {
      client.send('/api/orders/update', {}, JSON.stringify(payload));
    } else {
      client = Stomp.over(
        new SockJS('http://teamonion-idev.tmon.co.kr/teamonion', null, {
          headers: {
            Authorization: token,
            transports: sockJsProtocols,
          },
        }),
      );
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

  useEffect(() => {
    if (arrangedItem) {
      //수정
      const arrangedList = currentOrderList.map(item =>
        item.order_id == arrangedItem.order_id ? { ...item, ...arrangedItem } : item,
      );
      console.log('edit');
      console.dir(arrangedList);
      setCurrentOrderList(arrangedList);
    }
    if (arrangedItem && arrangedItem.menus) {
      const arrangedList = currentOrderList.concat(arrangedItem);
      console.log('add');
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
