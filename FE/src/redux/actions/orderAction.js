export const SET_CHANGED_ORDER = 'SET_CHANGED_ORDER';

export const SEND_ORDER_STATE = 'SEND_ORDER_STATE';

export const sendOrderStateAction = data => ({
  type: SEND_ORDER_STATE,
  data,
});

export const setChangedOrderAction = data => ({
  type: SET_CHANGED_ORDER,
  data,
});
