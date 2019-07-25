import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyOrderPresenter from './MyOrderPresenter';
import { userOrderAPI } from '../../../api/userApi';

const MyOrderContainer = () => {
  const { me } = useSelector(state => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchMyOrder() {
      try {
        if (me) {
          const newOrders = await userOrderAPI(me.id, false);
          setOrders(newOrders);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchMyOrder();
  }, []);

  const dummyOrders = [
    {
      pickup: false,
      paid: '결제완료',
      made: '제작중',
      menu: ['아메리카노', '더치커피'],
    },
    {
      pickup: false,
      paid: '미결제',
      made: '제작완료',
      menu: ['아메리카노', '더치커피', '아포카토'],
    },
  ];

  return <MyOrderPresenter orders={dummyOrders} setOrders={setOrders} userId={me.id} />;
};

export default MyOrderContainer;
