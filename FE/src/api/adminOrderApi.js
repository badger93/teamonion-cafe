import axios from 'axios';

const getNonpickupAllUrl = 'https://my-json-server.typicode.com/badger012/mockserver/orders';

const getNonpickupAll = (callback) => {
  axios
    .get(getNonpickupAllUrl)
    .then((res) => {
      callback(res.data.order);
    }) // order_id ,menus, paymentType, paid, made, pickup, createdDate, amount, Member_id
    .catch(err => alert('주문가져오기실패', err));
};

export default getNonpickupAll;
