import axios from 'axios';

export const duplicateCheckApi = data => axios.post('http://localhost:8080/api/members/overlap', data);

export const signUpApi = data => axios.post('http://localhost:8080/api/members', data);

export const signInApi = data => axios.post('api/members/login', data);

export const userOrderHistoryAPI = () => axios.get('')
;