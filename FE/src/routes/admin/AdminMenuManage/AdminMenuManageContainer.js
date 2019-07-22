import React, { useState, useEffect } from 'react';
import AdminMenuManagePresenter from './AdminMenuManagePresenter';
import {
  getMenuList, deleteMenuList, updateMenuList, createMenuList,
} from '../../../api/menuApi';

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

  const updateItem = (id, changeItem) => {
    updateMenuList(id, changeItem)
      .then(() => {
        const change = menuList.map(item => (item.id === id ? changeItem : item));
        setMenuList(change);
      }).catch((err) => {
        alert(`수정실패${err}`);
        const change = menuList.map(item => (item.id === id ? changeItem : item));
        setMenuList(change);
      });
  };

  const createItem = (newItem) => {
    createMenuList(newItem)
      .then((id) => {
        const list = menuList.concat({ id, ...newItem });
        setMenuList(list);
      })
      .catch((err) => {
        alert(`추가실패 ${err}`);
        const list = menuList.concat({ id: 222, ...newItem });
        setMenuList(list);
      });
  };

  useEffect(() => {
    getMenuList(setMenuList);
  }, []);

  useEffect(() => {
    // post, delete, put method
  }, [menuList]);

  return (
    <AdminMenuManagePresenter menuList={menuList} updateItem={updateItem} deleteItem={deleteItem} createItem={createItem} />
  );
};

export default AdminMenuManageContainer;
