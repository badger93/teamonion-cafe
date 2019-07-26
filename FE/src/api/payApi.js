// import axios from 'axios';

import fetchClient from './axios';

const axios = fetchClient();

export const payAPI = data =>
  axios.post(`api/orders`, {
    menuIdList: data.menuIdList,
    paid: data.paid,
    paymentType: data.paymentType,
  });
