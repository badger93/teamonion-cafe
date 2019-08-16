import fetchClient from './axios';

const axios = fetchClient();

const getNonpickupAll = () => {
  return axios.get(`api/orders?page=0&size=100&category=PICKUP_FALSE`);
};

export const getOrderHistory = (category = 'ALL', page = 0, size = 10) => {
  return axios.get(`api/orders?page=${page}&size=${size}&category=${category}`);
};

export default getNonpickupAll;
