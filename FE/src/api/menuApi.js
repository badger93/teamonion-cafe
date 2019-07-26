import axios from 'axios';

/* eslint-disable import/prefer-default-export */
const getMenuListUrl = 'api/menus';
// const getMenuListUrl = 'https://my-json-server.typicode.com/badger012/mockserver/menus';

export const getMenuList = callback => {
  // name, price, information, imageFile(src)
  axios
    .get(getMenuListUrl)
    .then(res => callback(res.data))
    .catch(err => {
      callback([]);
      alert('상품로드 실패', err);
    });
};

export const deleteMenuList = id => axios.delete(`http://localhost:8080/api/menus/${id}`);

export const createMenuList = item =>
  axios.post('http://localhost:8080/api/menus/admin/api/menus/', item);

export const updateMenuList = (id, item) =>
  axios.put(`http://localhost:8080/api/menus/admin/api/menus/${id}`, item);
