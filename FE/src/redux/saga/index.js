import { all, fork } from 'redux-saga/effects';
import user from './userSaga';
import pay from './paySaga';

export default function* rootSaga() {
  yield all([fork(pay), fork(user)]);
}
