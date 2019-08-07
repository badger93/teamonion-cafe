export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_FINISH = 'SIGNUP_FINISH';

export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';

export const SIGNIN_POPUP_CHANGE = 'SIGNIN_POPUP_CHANGE';

export const LOG_OUT = 'LOG_OUT';

export const CHANGE_POINT_REQUEST = 'CHANGE_POINT_REQUEST';
export const CHANGE_POINT_SUCCESS = 'CHANGE_POINT_SUCCESS';
export const CHANGE_POINT_FAILURE = 'CHANGE_POINT_FAILURE';

export const ORDERLIST_SET = 'ORDERLIST_GET';
export const ORDERLIST_DELETE = 'ORDERLIST_DELETE';

export const orderListDeleteAction = data => ({
  type: ORDERLIST_DELETE,
  data,
});

export const orderListSetAction = data => ({
  type: ORDERLIST_SET,
  data,
});

export const signUpRequestAction = data => ({
  type: SIGNUP_REQUEST,
  data,
});

export const signUpFinish = () => ({
  type: SIGNUP_FINISH,
});

export const signInRequestAction = data => ({
  type: SIGNIN_REQUEST,
  data,
});

export const logOutAction = () => ({ type: LOG_OUT });

export const signInPopupChangeAction = () => ({ type: SIGNIN_POPUP_CHANGE });

export const changePoint = data => ({ type: CHANGE_POINT_REQUEST, data });
