import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyOrderPresenter from './MyOrderPresenter';
import { userOrderAPI } from '../../../api/userApi';

const MyOrderContainer = () => {
  const { me } = useSelector(state => state.user);
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
    // console.log(orders);
  }, []);

  return (
    <MyOrderPresenter isLoading={isLoading} orders={orders} setOrders={setOrders} userId={me.id} />
  );
};

export default MyOrderContainer;
