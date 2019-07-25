// import axios from 'axios';

import fetchClient from './axios';

const axios = fetchClient();

export const payAPI = action =>
  axios.post(`api/${action.data.member_id}/orders`, { ...action.data });
