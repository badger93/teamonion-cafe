import fetchClient from './axios';

const axios = fetchClient();

// 'https://my-json-server.typicode.com/badger012/mockserver/menus'

// name, price, information, imageFile(src)
export const getMenuList = ({ itemSize, page }) =>
  axios.get(`api/menus?page=${page}&size=${itemSize}`);

export const deleteMenuList = id => axios.delete(`api/menus/${id}`);

export const createMenuList = item => {
  return axios.post('api/menus', item, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateMenuList = (id, item) =>
  axios.put(`api/menus/${id}`, item, { headers: { 'Content-Type': 'multipart/form-data' } });

export const searchMenu = menuName => axios.get(`api/menus/search?menu_name=${menuName}`);
