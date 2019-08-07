import fetchClient from './axios';

const axios = fetchClient();

// const getNonpickupAllUrl = 'https://my-json-server.typicode.com/badger012/mockserver/orders';

const getNonpickupAll = callback => {
  axios
    .get(`api/orders?page=0&size=100&category=PICKUP_FALSE`)
    .then(res => {
      const resList = res.data.content;
      const listData = resList.map(item => {
        return {
          order_id: item.id,
          menus: item.menuNameList,
          paymentType: item.paymentType,
          paid: item.paid,
          made: item.made,
          pickup: item.pickup,
          createdDate: item.createdDate,
          amount: item.amount,
          member_id: item.buyerId,
        };
      });
      callback(listData);
    }) // order_id ,menus, paymentType, paid, made, pickup, createdDate, amount, membe_id
    .catch(err => {
      alert('주문가져오기실패', err);
    });
};

export const putOrderState = (callback, { order_id, made, paid, pickup }, change) => {
  const payload = Object.assign({ made, pickup, paid }, change);
  axios
    .put(`api/orders/${order_id}`, payload)
    .then(() => {
      callback(order_id, payload);
    })
    .catch(err => {
      alert(`상태변경에러: ${err}`);
    });
};
// TODO adminOrder API 명세 나오는 대로 상태별 주문이력 가져오기로 코드 수정하자
export const getOrderHistory = (category = 'ALL', page = 0, size = 10) => {
  // mockUrl : 'https://my-json-server.typicode.com/badger012/mockserver/orders'
  return axios.get(`api/orders?page=${page}&size=${size}&category=${category}`);
};

export default getNonpickupAll;
