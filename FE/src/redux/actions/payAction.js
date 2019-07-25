

export const PAY_REQUEST = 'PAY_REQUEST';
export const PAY_SUCCESS = 'PAY_SUCCESS';
export const PAY_FAILURE = 'PAY_FAILURE';

export const PAY_FINISH = 'PAY_FINISH';
export const CARTTOPAY = 'CARTTOPAY';

export const payRequestAction = data => ({ type: PAY_REQUEST, data });

export const cartToPayAction = data => ({
  type: CARTTOPAY,
  data,
});

export const payFinishAction = () => ({ type: PAY_FINISH });
