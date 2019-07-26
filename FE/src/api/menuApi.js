import fetchClient from './axios';

const axios = fetchClient();

/* eslint-disable import/prefer-default-export */
// const getMenuListUrl = 'http://localhost:8080/api/menus';
// 'https://my-json-server.typicode.com/badger012/mockserver/menus'
const getMenuListUrl = 'api/menus';

export const getMenuList = callback => {
  // name, price, information, imageFile(src)
  axios
    .get(getMenuListUrl)
    .then(res => {
      callback(res.data.content);
    })
    .catch(err => {
      callback([]);
      alert('상품로드 실패', err);
    });
};

export const deleteMenuList = id => axios.delete(`api/menus/${id}`);

export const createMenuList = item => {
  return axios.post('api/menus', item, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateMenuList = (id, item) =>
  axios.put(`api/menus/${id}`, item, { headers: { 'Content-Type': 'multipart/form-data' } });
