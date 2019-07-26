import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserInfoPresenter from './UserInfoPresenter';
import { userOrderAPI } from '../../../api/userApi';

const UserInfoContainer = () => {
  const { me } = useSelector(state => state.user);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryAPI = async () => {
      try {
        const {
          data: { content },
        } = await userOrderAPI(me.id);

        const orders =
          content.length > 0
            ? content.map(object => ({
                id: object.id,
                time: object.createDate,
                money: object.amount,
                menu: object.menuNameList.join(','),
              }))
            : [];
        console.log(orders);
        setHistory(orders);
      } catch (e) {
        console.log(e);
      }
    };
    fetchHistoryAPI();
    setIsLoading(false);
  }, []);

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
      id: 0,
      time: '4:00',
      money: 40000,
      menu: ['아메리카노', '카페라떼'],
    },
    {
      id: 1,
      time: '4:00',
      money: 40000,
      menu: ['아메리카노', '카페라떼'],
    },
    {
      id: 2,
      time: '4:00',
      money: 40000,
      menu: ['아메리카노', '카페라떼'].join(' / '),
    },
    {
      id: 3,
      time: '4:00',
      money: 40000,
      menu: ['아메리카노', '카페라떼'].join(','),
    },
    {
      id: 4,
      time: '4:00',
      money: 40000,
      menu: ['아메리카노', '카페라떼'].join(','),
    },
    {
      id: 5,
      time: '4:00',
      money: 40000,
      menu: ['아메리카노', '카페라떼'].join(','),
    },
  ];

  return (
    <UserInfoPresenter
      isLoading={isLoading}
      columns={columns}
      rows={rows}
      id={me.memberId}
      point={me.point}
    />
  );
};

export default UserInfoContainer;
