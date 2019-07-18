import axios from 'axios';

/* eslint-disable import/prefer-default-export */
const getNonpickupAllUrl =  'https://my-json-server.typicode.com/badger012/mockserver/orders';

export const getNonpickupAll = (callback) => {
  axios
    .get(getNonpickupAllUrl)
    .then((res) => {
      callback(res.data.order);
    }) // paymentType, paid, made, pickup, createdDate, amount, Member_id
    .catch(err => alert('주문가져오기실패', err));
};
