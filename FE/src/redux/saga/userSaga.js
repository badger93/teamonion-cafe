import {
  all,
  fork,
  takeLatest,
  call,
  put,
  delay,
} from 'redux-saga/effects';
import {
  SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST, SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
} from '../actions/userAction';
import { signUpApi, signInApi } from '../../api/userApi';

function* signIn(action) {
  try {
    // const result = yield call(signInApi);
    yield delay(2000);
    const result = { // dummy login data
      id: 1,
      memberId: 'onion',
      memberRole: 'NORMAL',
      point: 1000000,
      jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6Im9uaW9uMjIiLCJyb2xlIjoiTk9STUFMIiwiZXhwIjoxNTYzODYwNzI5fQ.Nz4hWZU11NE3WLpDYXHQN_5vnWq6GCs2QNKVj1CyOuU',
    };
    yield put({
      // put은 dispatch 동일
      type: SIGNIN_SUCCESS,
      data: { ...result },
    });
  } catch (e) {
    // signupAPI 실패
    console.error(e);
    yield put({
      type: SIGNIN_FAILURE,
      error: e.message,
    });
  }
}

function* watchSignIn() {
  yield takeLatest(SIGNIN_REQUEST, signIn);
}


function* signUp(action) {
  try {
    const result = yield call(() => signUpApi(action.data));
    yield put({
      type: SIGNUP_SUCCESS,
    });
    // yield put({
    //   type: SIGNIN_SUCCESS,
    //   data: { ...result },
    // });
  } catch (error) {
    // signupAPI 실패
    console.log(error);
    yield put({
      type: SIGNUP_FAILURE,
      error: error.message,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

// all은 여러 이펙트를 동시 실행가능케함
export default function* userSaga() {
  yield all([fork(watchSignUp), fork(watchSignIn)]);
  // 괄호 위치 유의!!
  // 리스너 여러개 쓰고싶으면 all을 씀
  // all은 여러 이펙트를 동시 실행가능케함
}
