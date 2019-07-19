import axios from 'axios';

const getNonpickupAllUrl = 'https://my-json-server.typicode.com/badger012/mockserver/orders';

const getNonpickupAll = (callback) => {
  axios
    .get(getNonpickupAllUrl)
    .then((res) => {
      const data = res.data.order;

      const transferedList = data.map(items => Object.values(items).map(item => (
        Array.isArray(item)
          ? item.reduce(((acc, menu) => acc + menu), '') : item)));

      callback(transferedList);
    }) // order_id ,menus, paymentType, paid, made, pickup, createdDate, amount, Member_id
    .catch(err => alert('주문가져오기실패', err));
};

export default getNonpickupAll;
