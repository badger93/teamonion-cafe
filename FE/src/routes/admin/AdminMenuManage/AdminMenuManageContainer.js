import React, { useState, useEffect } from 'react';
import AdminMenuManagePresenter from './AdminMenuManagePresenter';
import { getMenuList, deleteMenuList, updateMenuList, createMenuList } from '../../../api/menuApi';

const AdminMenuManageContainer = () => {
  const [menuList, setMenuList] = useState([]);
  const deleteItem = id => {
    deleteMenuList(id)
      .then(() => {
        const change = menuList.filter(item => item.id !== id);
        setMenuList(change);
      })
      .catch(err => {
        alert(`삭제실패${err}`);
      });
  };

  const updateItem = changeItem => {
    updateMenuList(changeItem.id, { ...changeItem, imageFile: '' }) // 인코딩 된 blob imageFile을 빈값으로 초기화
      .then(() => {
        const change = menuList.map(item => (item.id === changeItem.id ? changeItem : item));
        setMenuList(change);
      })
      .catch(err => {
        alert(`수정실패${err}`);
      });
  };

  const createItem = newItem => {
    console.log({ ...newItem, imageFile: '' });
    createMenuList({ ...newItem, imageFile: '' }) // 인코딩 된 blob imageFile을 빈값으로 초기화
      .then(id => {
        const list = menuList.concat({ id, ...newItem });
        setMenuList(list);
      })
      .catch(err => {
        alert(`추가실패 ${err}`);
      });
  };

  useEffect(() => {
    getMenuList(setMenuList);
  }, []);

  return (
    <AdminMenuManagePresenter
      menuList={menuList}
      updateItem={updateItem}
      deleteItem={deleteItem}
      createItem={createItem}
    />
  );
};

export default AdminMenuManageContainer;
