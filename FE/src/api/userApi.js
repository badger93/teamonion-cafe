// import axios from 'axios';
import fetchClient from './axios';

const axios = fetchClient();

export const duplicateCheckApi = data => axios.post('api/members/overlap', data);

export const signUpApi = data => axios.post('api/members', data);

export const signInApi = data => axios.post('api/members/login', data);

export const userOrderAPI = (memberId, pickup = true, size = 20, page = 1) => axios.get(`api/${memberId}/orders`, { params: { pickup, page, size } });

// export const myOrderAPI = memberId => axios.get(`/api/${memberId}/orders/state`);

export const myPointApi = memberId => axios.get(`/api/members/${memberId}/point`);
