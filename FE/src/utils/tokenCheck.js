import { useDispatch } from 'react-redux';
import { logOutAction } from '../redux/actions/userAction';

export const useTokenCheck = () => {
  const dispatch = useDispatch();
  const tokenCheck = err => {
    if (err) {
      dispatch(logOutAction());
    }
    return false;
  };
  return { tokenCheck };
};
