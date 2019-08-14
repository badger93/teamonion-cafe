import React, { useState, useEffect } from 'react';
import AdminMenuManagePresenter from './AdminMenuManagePresenter';
import { getMenuList, deleteMenuList, updateMenuList, createMenuList } from '../../../api/menuApi';
import changeImagePath from '../../../utils/changeImagePath';
import { useTokenCheck } from '../../../utils/tokenCheck';

const AdminMenuManageContainer = () => {
  const [menuList, setMenuList] = useState([]);
  const [pageData, setPageData] = useState({});
  const { tokenCheck } = useTokenCheck();
  const deleteItem = id => {
    deleteMenuList(id)
      .then(() => {
        const change = menuList.filter(item => item.id !== id);
        setMenuList(change);
      })
      .catch(err => {
        tokenCheck(err);
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
                imagePath: fakeImg,
              }
            : item,
        );
        setMenuList(change);
        alert(`${formData.get('name')} 수정되었습니다`);
      })
      .catch(err => {
        tokenCheck(err);
      });
  };

  const createItem = (formData, fakeImg) => {
    createMenuList(formData)
      .then(res => {
        const list = [
          {
            id: res.data,
            name: formData.get('name'),
            price: formData.get('price'),
            information: formData.get('information'),
            imagePath: fakeImg,
          },
          ...menuList,
        ];
        setMenuList(list);
        alert(`${formData.get('name')} 추가되었습니다`);
      })
      .catch(err => {
        tokenCheck(err);
      });
  };

  const getMenuBypage = async ({ itemSize, page }) => {
    try {
      const res = await getMenuList({ itemSize, page });
      const { content, totalPages } = res.data;
      const newContent = changeImagePath(content);
      setMenuList(newContent);
      setPageData({ page, totalPages });
    } catch (err) {
      tokenCheck(err);
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
