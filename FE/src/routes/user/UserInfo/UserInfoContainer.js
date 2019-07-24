import React from 'react';
import { useSelector } from 'react-redux';
import UserInfoPresenter from './UserInfoPresenter';

const UserInfoContainer = () => {
  const { me } = useSelector(state => state.user);

  const defaultColumnProperties = {
    resizable: true,
  };
  const columns = [
    { key: 'id', name: '주문번호' },
    { key: 'time', name: '주문시간' },
    { key: 'money', name: '주문금액' },
    { key: 'menu', name: '주문메뉴' },
  ].map(c => ({ ...c, ...defaultColumnProperties }));

  const rows = [
    {
      id: 0, time: '4:00', money: 40000, menu: ['아메리카노', '카페라떼'],
    },
    {
      id: 1, time: '4:00', money: 40000, menu: ['아메리카노', '카페라떼'],
    },
    {
      id: 2, time: '4:00', money: 40000, menu: ['아메리카노', '카페라떼'],
    },
    {
      id: 3, time: '4:00', money: 40000, menu: ['아메리카노', '카페라떼'],
    },
  ];

  return (
    <UserInfoPresenter
      columns={columns}
      rows={rows}
      id={me.memberId}
      point={me.point}
    />
  );
};

export default UserInfoContainer;
