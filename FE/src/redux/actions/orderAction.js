export const SET_CHANGED_ORDER = 'SET_CHANGED_ORDER';

export const SEND_ORDER_STATE = 'SEND_ORDER_STATE';

export const SET_WS_CONNECT = 'SET_WS_CONNECT';

export const setWsConnectAction = data => ({
  type: SET_WS_CONNECT,
  data,
});

export const sendOrderStateAction = data => ({
  type: SEND_ORDER_STATE,
  data,
});

export const setChangedOrderAction = data => ({
  type: SET_CHANGED_ORDER,
  data,
});
