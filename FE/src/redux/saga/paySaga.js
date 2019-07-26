import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import { PAY_FAILURE, PAY_SUCCESS, PAY_REQUEST } from '../actions/payAction';
import { payAPI } from '../../api/payApi';
import { CHANGE_POINT } from '../actions/userAction';

function* pay(action) {
  try {
    console.log(action.data);
    const result = yield call(() => payAPI(action.data));
    console.log(result);
    // yield delay(2000);
    yield put({
      type: PAY_SUCCESS,
    });
    yield put({
      type: CHANGE_POINT,
      data: action.data.afterPoint,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: PAY_FAILURE,
    });
  }
}

function* watchPay() {
  yield takeLatest(PAY_REQUEST, pay);
}

export default function* paySaga() {
  yield all([fork(watchPay)]);
}
