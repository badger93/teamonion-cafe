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
  const [isLoading, setIsLoading] = useState(true);
  const [letsConnection, setLetsConnection] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const localToken = localStorage.getItem('TOKEN');
  const sessionToken = sessionStorage.getItem('TOKEN');

  const token = localToken
    ? `Bearer ${localToken}`
    : '' || sessionToken
    ? `Bearer ${sessionToken}`
    : '';

  const sockJsProtocols = ['xhr-streaming', 'xhr-polling'];
  // const [currentOrderList, setCurrentOrderList] = useState([]);
  const client = Stomp.over(
    new SockJS('/teamonion', null, {
      transports: sockJsProtocols,
    }),
  );

  const socketMyOrderInit = () => {
    if (client.connected === false) {
      client.connect({ Authorization: token }, frame => {
        client.subscribe('/user/queue/orders/update', msg => {
          const Data = msg.body && JSON.parse(msg.body);
          //  console.log(Data);
          setChangedData(Data);
        });
      });
    }
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
          setLetsConnection(true);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchMyOrder();
    // console.log(orders);
  }, []);

  useEffect(() => {
    if (letsConnection === true) {
      // 한번만 연결 되도록
      socketMyOrderInit();
    }
    return () => {
      try {
        if (client.connected === true) {
          client.disconnect(() => {
            // alert('socket disconnected!');
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
  }, [letsConnection]);

  useEffect(() => {
    // 변경될 것 있을시 추가
    if (changedData && me.memberId === changedData.buyerId && orders.length > 0) {
      // console.dir(orders);
      let newOrders = [...orders];
      const changedDataIndex = newOrders.findIndex(e => {
        // 변화된 주문정보 찾기
        return e.id === changedData.id;
      });
      // console.log('dataindex:' + changedDataIndex);
      if (changedData.pickup === true && changedDataIndex >= 0) {
        // 픽업된 주문정보 삭제
        setIsDeleting(true);
        setTimeout(() => {
          const ordersWithoutAfterPickup = [
            ...newOrders.slice(0, changedDataIndex),
            ...newOrders.slice(changedDataIndex + 1, newOrders.length),
          ];
          newOrders = [...ordersWithoutAfterPickup];
          setIsDeleting(false);
          setOrders([...newOrders]);
        }, 3000);
      } else if (changedDataIndex >= 0) {
        // 변화만 된 주문정보 변경
        setIsChanging(true);

        setTimeout(() => {
          newOrders[changedDataIndex] = {
            ...newOrders[changedDataIndex],
            made: changedData.made,
            paid: changedData.paid,
          };
          setIsChanging(false);
          setOrders([...newOrders]);
        }, 3000);

        // console.dir(newOrders[changedDataIndex]);
      }
      // console.dir(newOrders);
    }
  }, [changedData]);

  return (
    <>
      <MyOrderPresenter
        isLoading={isLoading}
        orders={orders}
        setOrders={setOrders}
        userId={me.id}
        isChanging={isChanging}
        changedData={changedData}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default MyOrderContainer;
