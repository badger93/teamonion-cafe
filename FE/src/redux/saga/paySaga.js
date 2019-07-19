import {
  all,
  fork,
  takeLatest,
  call,
  put,
  delay,
} from 'redux-saga/effects';
import axios from 'axios';
import { PAY_FAILURE, PAY_SUCCESS, PAY_REQUEST } from '../actions/payAction';

function payAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/pay');
}

function* pay() {
  try {
    // yield call(loginAPI);
    yield delay(2000);
    yield put({
      // put은 dispatch 동일
      type: PAY_SUCCESS,
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: PAY_FAILURE,
    });
  }
}

function* watchPay() {
  yield takeLatest(PAY_REQUEST, pay);
}

// all은 여러 이펙트를 동시 실행가능케함
export default function* paySaga() {
  yield all([fork(watchPay)]);
  // 괄호 위치 유의!!
  // 리스너 여러개 쓰고싶으면 all을 씀
  // all은 여러 이펙트를 동시 실행가능케함
}
