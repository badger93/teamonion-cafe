
export const CARTTOPAY = 'CARTTOPAY';

export const PAY_REQUEST = 'PAY_REQUEST';
export const PAY_SUCCESS = 'PAY_SUCCESS';
export const PAY_FAILURE = 'PAY_FAILURE';


export const cartToPayAction = data => ({
  type: CARTTOPAY,
  data,
});

export const payRequestAction = data => ({ type: PAY_REQUEST, data })
;