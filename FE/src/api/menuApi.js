import axios from 'axios';

/* eslint-disable import/prefer-default-export */
const getMenuListUrl = 'https://my-json-server.typicode.com/badger012/mockserver/menus';


export const getMenuList = (callback) => { // name, price, information, imageFile(src)
  axios
    .get(getMenuListUrl)
    .then(res => callback(res.data))
    .catch((err) => {
      callback([]);
      alert('상품로드 실패', err);
    });
};

export const deleteMenuList = id => axios.delete(`/admin/api/menus/${id}`);

export const createMenuList = item => axios.post('/admin/api/menus/', item);
