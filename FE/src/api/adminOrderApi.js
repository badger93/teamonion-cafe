/* eslint-disable camelcase */
import axios from 'axios';

const getNonpickupAllUrl = 'https://my-json-server.typicode.com/badger012/mockserver/orders';

const getNonpickupAll = (callback) => {
  axios
    .get(getNonpickupAllUrl)
    .then((res) => {
      callback(res.data);
    }) // order_id ,menus, paymentType, paid, made, pickup, createdDate, amount, member_id
    .catch(err => alert('주문가져오기실패', err));
};

export const putOrderState = (callback, {
  member_id, order_id, made, paid, pickup,
}, change) => {
  const payload = Object.assign({ made, pickup, paid }, { change });
  axios
    .put(`/admin/api/${member_id}/orders/${order_id}`, payload)
    .then(() => { callback(order_id, payload); })
    .catch((err) => {
      alert(`상태변경에러: ${err}`);
      callback(order_id, payload);
    });
};

export default getNonpickupAll;
