import React from 'react';
import MyOrderPresenter from './MyOrderPresenter';

const MyOrderContainer = () => {
  const orders = [
    {
      pickup: false,
      paid: '결제완료',
      maid: '제작중',
      menu: ['아메리카노', '더치커피'],
    },
    {
      pickup: false,
      paid: '미결제',
      maid: '제작중',
      menu: ['아메리카노', '더치커피'],
    },
  ];

  return <MyOrderPresenter orders={orders} />;
};

export default MyOrderContainer;
