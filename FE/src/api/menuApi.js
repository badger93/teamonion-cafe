import axios from 'axios';

/* eslint-disable import/prefer-default-export */
const getMenuListUrl = 'https://my-json-server.typicode.com/badger012/mockserver/menus';

export const getMenuList = (callback) => {
  axios
    .get(getMenuListUrl)
    .then(res => callback(res.data.menu))
    .catch(err => alert('상품로드 실패', err));
};
