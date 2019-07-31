import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserInfoPresenter from './UserInfoPresenter';
import { userOrderAPI } from '../../../api/userApi';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../../../redux/actions/userAction';

const UserInfoContainer = () => {
  const { me } = useSelector(state => state.user);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState({});
  const dispatch = useDispatch();

  const fetchHistoryAPI = async (listSize = 20, page = 0) => {
    try {
      const {
        data: { content, totalPages },
      } = await userOrderAPI(me.id, true, listSize, page);

      const orders =
        content.length > 0
          ? content.map(object => ({
              id: object.id,
              time: object.createdDate,
              money: object.amount,
              menu: object.menuNameList.join(' , '),
            }))
          : [];
      // console.log(orders);
      setHistory(orders);
      setPageData({ page, totalPages });
    } catch (e) {
      console.log(e);
      dispatch(logOutAction());
      localStorage.removeItem('USER');
      localStorage.removeItem('TOKEN'); // 로그아웃시 토큰 삭제
    }
  };

  useEffect(() => {
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
      pageData={pageData}
      fetchHistoryAPI={fetchHistoryAPI}
    />
  );
};

export default UserInfoContainer;
