import { useDispatch } from 'react-redux';
import { logOutAction } from '../redux/actions/userAction';

export const useTokenCheck = () => {
  const dispatch = useDispatch();
  const tokenCheck = err => {
    const checkErr = err.response.status;
    if (checkErr === 500) {
      dispatch(logOutAction());
    } else {
      alert(`api failure ${err}`);
    }
    return false;
  };
  return { tokenCheck };
};
