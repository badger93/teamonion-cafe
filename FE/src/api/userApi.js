import fetchClient from './axios';

const axios = fetchClient();

export const duplicateCheckApi = data =>
  axios.get('api/members/duplicate', { params: { memberId: data } });

export const signUpApi = data => axios.post('api/members', data);

export const signInApi = data => axios.post('api/members/login', data);

export const userOrderAPI = (memberId, pickup = true, size = 20, page = 0) => {
  return axios.get(`api/orders/my`, { params: { pickup, page, size } });
};

export const myPointApi = memberId => axios.get(`/api/members/${memberId}/point`);

// admin
export const getUserList = ({ itemSize, page }) =>
  axios.get(`/api/members?page=${page}&size=${itemSize}`);

export const setUserPoint = ({ id, changePoint: point }) =>
  axios.put(`api/members/${id}/point`, point, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const searchUser = (memberId, page = 0, size = 20) =>
  axios.get(`api/members/search?memberId=${memberId}&page=${page}&size=${size}`);
