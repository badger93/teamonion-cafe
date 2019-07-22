import {
  all,
  fork,
  takeLatest,
  call,
  put,
  delay,
} from 'redux-saga/effects';
import { SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST } from '../actions/userAction';
import { signUpSubmitApi } from '../../api/userApi';


function* signUp() {
  try {
    yield call(signUpSubmitApi);
    // delay(2000);
    yield put({
      // put은 dispatch 동일
      type: SIGNUP_SUCCESS,
    });
  } catch (e) {
    // signupAPI 실패
    console.error(e);
    yield put({
      type: SIGNUP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

// all은 여러 이펙트를 동시 실행가능케함
export default function* userSaga() {
  yield all([fork(watchSignUp)]);
  // 괄호 위치 유의!!
  // 리스너 여러개 쓰고싶으면 all을 씀
  // all은 여러 이펙트를 동시 실행가능케함
}
