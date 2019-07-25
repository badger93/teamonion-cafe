import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import { PAY_FAILURE, PAY_SUCCESS, PAY_REQUEST } from '../actions/payAction';
import { payAPI } from '../../api/payApi';
import { CHANGE_POINT } from '../actions/userAction';

function* pay(action) {
  try {
    yield call(() => payAPI(action));
    // yield delay(2000);
    yield put({
      // put은 dispatch 동일
      type: PAY_SUCCESS,
    });
    yield put({
      type: CHANGE_POINT,
      data: action.data.afterPoint,
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e.response);
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
