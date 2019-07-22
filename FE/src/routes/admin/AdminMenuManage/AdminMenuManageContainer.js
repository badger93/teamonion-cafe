import React, { useState, useEffect } from 'react';
import AdminMenuManagePresenter from './AdminMenuManagePresenter';
import { getMenuList, deleteMenuList } from '../../../api/menuApi';

const AdminMenuManageContainer = () => {
  const [menuList, setMenuList] = useState([]);
  const deleteItem = (id) => {
    deleteMenuList(id)
      .then(() => {
        const change = menuList.filter(item => item.id !== id);
        setMenuList(change);
      })
      .catch((err) => {
        alert(`삭제실패${err}`);
        const change = menuList.filter(item => item.id !== id);
        setMenuList(change);
      });
  };

  useEffect(() => {
    getMenuList(setMenuList);
  }, []);

  useEffect(() => {
    // post, delete, put method
  }, [menuList]);

  return (
    <AdminMenuManagePresenter menuList={menuList} setMenuList={deleteItem} />
  );
};

export default AdminMenuManageContainer;
