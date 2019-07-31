import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyOrderPresenter from './MyOrderPresenter';
import { userOrderAPI } from '../../../api/userApi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const MyOrderContainer = () => {
  const { me } = useSelector(state => state.user);
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 웹소켓을 이용한 내 주문정보 가져오기

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
        const myOrderData = msg.body && JSON.parse(msg.body).content;
        console.log(myOrderData);
        myOrderData && setOrders(myOrderData);
      });
      // client.send('/api/orders/update', {}, JSON.stringify({ memberId: me.id }));
    });
  };

  // // 최초 api call
  useEffect(() => {
    socketMyOrderInit();
    // console.log(client);
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

  // useEffect(() => {
  //   const fetchMyOrder = async () => {
  //     try {
  //       if (me) {
  //         const {
  //           data: { content },
  //         } = await userOrderAPI(me.id, false);
  //         // console.log(content);
  //         setOrders(content);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchMyOrder();
  //   setIsLoading(false);
  //   // console.log(orders);
  // }, []);

  return (
    <MyOrderPresenter isLoading={isLoading} orders={orders} setOrders={setOrders} userId={me.id} />
  );
};

export default MyOrderContainer;
