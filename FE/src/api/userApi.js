import axios from 'axios';

export const duplicateCheckApi = data => axios.post('http://localhost:8080/api/members/overlap', data);

export const signUpApi = data => axios.post('http://localhost:8080/api/members', data);

export const signInApi = data => axios.post('api/members/login', data);

// admin
// '/api/members?page=${page}&size=${itemSize}'
export const getUserList = ({ itemSize, page }) => axios.get('https://my-json-server.typicode.com/badger012/mockserver/members');

export const setUserPoint = ({ id, changePoint }) => axios.put(`/api/members/${id}/point`, { id, changePoint });
