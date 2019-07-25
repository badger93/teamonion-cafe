// import axios from 'axios';
import fetchClient from './axios';

const axios = fetchClient();

export const duplicateCheckApi = data => axios.post('api/members/overlap', data);

export const signUpApi = data => axios.post('api/members', data);

export const signInApi = data => axios.post('api/members/login', data);


export const userOrderHistoryAPI = memberId => axios.get(`api/${memberId}/orders`);

export const myOrderAPI = memberId => axios.get(`/api/${memberId}/orders/state`);

// admin
// '/api/members?page=${page}&size=${itemSize}'
export const getUserList = ({ itemSize, page }) => axios.get('https://my-json-server.typicode.com/badger012/mockserver/members');

export const setUserPoint = ({ id, changePoint }) => axios.put(`/api/members/${id}/point`, { id, changePoint });

export const searchUser = memberId => axios.get(`/api/members/${memberId}`);
