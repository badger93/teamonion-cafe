import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyOrderPresenter from './MyOrderPresenter';
import { userOrderAPI } from '../../../api/userApi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const MyOrderContainer = () => {
  const { me } = useSelector(state => state.user);
  const [orders, setOrders] = useState([]);
  const [changedData, setChangedData] = useState(null);
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
      // 의문점 : 콜백 함수안에 들어가면 처음 초기의 빈값이 계속유지됨
      console.log(frame);
      alert(`socket conneted: ${frame}`);
      client.subscribe('/topic/order', msg => {
        console.log('message : ' + msg);
        // const newArrayOrders = [...orders];
        const Data = msg.body && JSON.parse(msg.body);
        setChangedData(Data);
        console.log('changedData:');
        console.dir(changedData);
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
          setOrders([...content]);
          await socketMyOrderInit(); // 웹 소켓 연결
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchMyOrder();
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

  useEffect(() => {
    console.log('im useeffect in somthing');
    console.dir(orders);
    console.log('changeddata :');
    console.dir(changedData);
    if (orders.length > 0 && changedData) {
      console.dir(orders);
      let newOrders = [...orders];
      console.dir(newOrders);
      console.dir(changedData);
      const changedDataIndex = newOrders.findIndex(e => {
        // 변화된 주문정보 찾기
        return e.id === changedData.id;
      });
      console.log('dataindex:' + changedDataIndex);
      if (changedData.pickup === true) {
        // 픽업된 주문정보 삭제
        const ordersWithoutAfterPickup = [
          ...newOrders.slice(0, changedDataIndex),
          ...newOrders.slice(changedDataIndex + 1, newOrders.length),
        ];
        newOrders = [...ordersWithoutAfterPickup];
      } else {
        // 변화만 된 주문정보 변경
        newOrders[changedDataIndex] = {
          ...newOrders[changedDataIndex],
          made: changedData.made,
          paid: changedData.paid,
        };
        console.dir(newOrders[changedDataIndex]);
      }
      console.dir(newOrders);
      setOrders([...newOrders]);
    }
  }, [changedData]);

  return (
    <MyOrderPresenter isLoading={isLoading} orders={orders} setOrders={setOrders} userId={me.id} />
  );
};

export default MyOrderContainer;
