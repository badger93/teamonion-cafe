import axios from 'axios';

export const duplicateCheckApi = (data) =>
  axios.post('/api/members/overlap', data);

export const signUpSubmitApi = (data) => axios.post('/api/members', data);
