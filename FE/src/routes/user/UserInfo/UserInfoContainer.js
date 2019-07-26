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
                time: object.createdDate,
                money: object.amount,
                menu: object.menuNameList.join(' , '),
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
    { key: 'id', name: '번호', width: 50 },
    { key: 'time', name: '주문시간', width: 130 },
    { key: 'money', name: '주문금액', width: 80 },
    { key: 'menu', name: '주문메뉴' },
  ].map(c => ({ ...c, ...defaultColumnProperties }));

  return (
    <UserInfoPresenter
      isLoading={isLoading}
      columns={columns}
      rows={history}
      id={me.memberId}
      point={me.point}
    />
  );
};

export default UserInfoContainer;
