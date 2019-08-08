import { combineReducers } from 'redux';
import user from './userReducer';
import pay from './payReducer';
import order from './orderReducer';

// 이렇게 하나로 묶어준다
const rootReducer = combineReducers({
  user,
  pay,
  order,
});

export default rootReducer;
