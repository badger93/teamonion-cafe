import fetchClient from './axios';

const axios = fetchClient();

const getNonpickupAll = () => {
  return axios.get(`api/orders?page=0&size=100&category=PICKUP_FALSE`);
};
// TODO adminOrder API 명세 나오는 대로 상태별 주문이력 가져오기로 코드 수정하자
export const getOrderHistory = (category = 'ALL', page = 0, size = 10) => {
  // mockUrl : 'https://my-json-server.typicode.com/badger012/mockserver/orders'
  return axios.get(`api/orders?page=${page}&size=${size}&category=${category}`);
};

export default getNonpickupAll;
