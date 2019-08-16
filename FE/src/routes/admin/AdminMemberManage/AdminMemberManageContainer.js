import React, { useState, useEffect } from 'react';
import AdminMemberManagePresenter from './AdminMemberManagePresenter';
import { getUserList, setUserPoint, searchUser } from '../../../api/userApi';
import { useTokenCheck } from '../../../utils/tokenCheck';

const AdminMemberManageContainer = () => {
  const [memberListData, setMemberListData] = useState([]);
  const [memberListPageData, setMemberPageData] = useState({});
  const [searchText, setSearchText] = useState('');
  const { tokenCheck } = useTokenCheck();

  const getUserByPage = ({ itemSize, page }) => {
    getUserList({ itemSize, page })
      .then(res => {
        const { content, totalPages } = res.data;
        setMemberListData(content);
        setMemberPageData({ page, totalPages });
      })
      .catch(err => tokenCheck(err));
  };

  const setPoint = ({ id, changePoint }) => {
    setUserPoint({ id, changePoint })
      .then(() => {
        const result = memberListData.map(item =>
          item.id === id ? { ...item, point: changePoint } : item,
        );
        setMemberListData(result);
      })
      .catch(err => {
        tokenCheck(err);
      });
  };

  const searchUserByID = async (memberId, page, itemSize) => {
    try {
      const res = await searchUser(memberId, page, itemSize);
      const { content, totalPages } = res.data;
      setMemberListData(content);
      setMemberPageData({ page, totalPages });
      setSearchText(memberId);
    } catch (err) {
      tokenCheck(err);
    }
  };

  useEffect(() => {
    getUserByPage({ itemSize: 10, page: 0 });
  }, []);

  return (
    <AdminMemberManagePresenter
      memberListData={memberListData}
      memberListPageData={memberListPageData}
      setPoint={setPoint}
      getUserByPage={getUserByPage}
      searchUserByID={searchUserByID}
      searchText={searchText}
    />
  );
};

export default AdminMemberManageContainer;
