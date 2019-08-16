import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { PAY_FAILURE, PAY_SUCCESS, PAY_REQUEST } from '../actions/payAction';
import { payAPI } from '../../api/payApi';
import { CHANGE_POINT_REQUEST, LOG_OUT } from '../actions/userAction';

function* pay(action) {
  try {
    yield call(() => payAPI(action.data));
    yield put({
      type: PAY_SUCCESS,
    });
    yield put({
      type: CHANGE_POINT_REQUEST,
      data: action.data.memberId,
    });
  } catch (e) {
    const { response: { data = '' } = {} } = e;
    console.log(e);
    if (data === '' || data === '인증에 실패했습니다') {
      yield put({
        type: LOG_OUT,
      });
      localStorage.removeItem('USER');
      localStorage.removeItem('CART');
      localStorage.removeItem('TOKEN'); // 로그아웃시 토큰 삭제
    }
    yield put({
      type: PAY_FAILURE,
      payErrorReason: data,
    });
  }
}

function* watchPay() {
  yield takeLatest(PAY_REQUEST, pay);
}

export default function* paySaga() {
  yield all([fork(watchPay)]);
}
