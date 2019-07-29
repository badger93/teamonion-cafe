import React, { useState, useEffect } from 'react';
import AdminMenuManagePresenter from './AdminMenuManagePresenter';
import { getMenuList, deleteMenuList, updateMenuList, createMenuList } from '../../../api/menuApi';

const AdminMenuManageContainer = () => {
  const [menuList, setMenuList] = useState([]);
  const [pageData, setPageData] = useState([]);
  const deleteItem = id => {
    deleteMenuList(id)
      .then(() => {
        const change = menuList.filter(item => item.id !== id);
        setMenuList(change);
      })
      .catch(err => {
        console.dir(err);
        alert(`삭제실패${err}`);
      });
  };

  const updateItem = (formData, id, fakeImg) => {
    updateMenuList(id, formData)
      .then(() => {
        const change = menuList.map(item =>
          item.id === id
            ? {
                ...item,
                name: formData.get('name'),
                price: formData.get('price'),
                information: formData.get('information'),
                imageFile: fakeImg,
              }
            : item,
        );
        setMenuList(change);
      })
      .catch(err => {
        console.dir(err);
        alert(`수정실패${err}`);
      });
  };

  const createItem = (formData, fakeImg) => {
    createMenuList(formData)
      .then(res => {
        const list = menuList.concat({
          id: res.data,
          name: formData.get('name'),
          price: formData.get('price'),
          information: formData.get('information'),
          imageFile: fakeImg,
        });
        setMenuList(list);
      })
      .catch(err => {
        console.dir(err);
        alert(`추가실패 ${err}`);
      });
  };

  const getMenuBypage = async ({ itemSize, page }) => {
    try {
      const res = await getMenuList({ itemSize, page });
      const { content, totalPages } = res.data;
      setMenuList(content);
      setPageData({ page, totalPages });
    } catch (err) {
      alert('상품로드 실패', err);
      console.dir(err);
    }
  };

  useEffect(() => {
    getMenuBypage({ itemSize: 10, page: 0 });
  }, []);

  return (
    <AdminMenuManagePresenter
      menuList={menuList}
      updateItem={updateItem}
      deleteItem={deleteItem}
      createItem={createItem}
      pageData={pageData}
      getMenuBypage={getMenuBypage}
    />
  );
};

export default AdminMenuManageContainer;
