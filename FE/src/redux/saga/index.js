import { all, call } from 'redux-saga/effects';
import user from './userSaga';
import pay from './paySaga';

export default function* rootSaga() {
  yield all([call(pay), call(user)]);
}
