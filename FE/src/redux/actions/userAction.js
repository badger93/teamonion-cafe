export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';

export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';

export const SIGNIN_REF_REGISTER = 'SIGNIN_REF_REGISTER';

export const LOG_OUT = 'LOG_OUT';

export const signUpRequestAction = data => ({
  type: SIGNUP_REQUEST,
  data,
});

export const signInRequestAction = data => ({
  type: SIGNIN_REQUEST,
  data,
});

export const logOutAction = () => ({ type: LOG_OUT });

export const signInRefRegisterAction = data => ({ type: SIGNIN_REF_REGISTER, data });
