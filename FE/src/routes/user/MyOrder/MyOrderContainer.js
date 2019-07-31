import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyOrderPresenter from './MyOrderPresenter';
import { userOrderAPI } from '../../../api/userApi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const MyOrderContainer = () => {
  const { me } = useSelector(state => state.user);
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const localToken = localStorage.getItem('TOKEN');
  const sessionToken = sessionStorage.getItem('TOKEN');
  const token = localToken
    ? `Bearer ${localToken}`
    : '' || sessionToken
    ? `Bearer ${sessionToken}`
    : '';

  // const [currentOrderList, setCurrentOrderList] = useState([]);
  const client = Stomp.over(
    new SockJS('/teamonion', null, {
      headers: { Authorization: token },
    }),
  );

  const socketMyOrderInit = () => {
    client.connect({}, frame => {
      console.log(frame);
      alert(`socket conneted: ${frame}`);
      client.subscribe('/topic/order', msg => {
        console.log('message : ' + msg);
        const newArrayOrders = orders;
        const changedData = msg.body && JSON.parse(msg.body);
        console.log('changedData:' + changedData);
        console.log('orders:' + orders);
        const changedDataIndex =
          orders &&
          orders.length > 0 &&
          orders.findIndex(e => {
            return e.id === changedData.id;
          });
        if (newArrayOrders && newArrayOrders.length > 0) {
          newArrayOrders[changedDataIndex] = {
            ...orders[changedDataIndex],
            made: changedData.made,
            paid: changedData.paid,
          };
          if (changedData.pickup === true) {
            newArrayOrders = newArrayOrders.slice(changedDataIndex);
          }
        }
        setOrders(...newArrayOrders);
      });
      // client.send('/api/orders/update', {}, JSON.stringify({ memberId: me.id }));
    });
  };

  useEffect(() => {
    const fetchMyOrder = async () => {
      try {
        if (me) {
          const {
            data: { content },
          } = await userOrderAPI(me.id, false);
          // console.log(content);
          setOrders(content);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchMyOrder();
    socketMyOrderInit();
    setIsLoading(false);
    // console.log(orders);
    return () => {
      try {
        client.disconnect(() => {
          alert('socket disconnected!');
        });
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return (
    <MyOrderPresenter isLoading={isLoading} orders={orders} setOrders={setOrders} userId={me.id} />
  );
};

export default MyOrderContainer;
