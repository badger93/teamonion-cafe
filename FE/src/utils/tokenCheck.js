import { useDispatch } from 'react-redux';
import { logOutAction } from '../redux/actions/userAction';

// 이름은 tokenCheck 이지만 에러핸들러 역할을 함
export const useTokenCheck = err => {
  const dispatch = useDispatch();
  const tokenCheck = err => {
    if (err.status === 401 || err.command === 'ERROR') {
      dispatch(logOutAction());
      alert('권한이 없습니다');
      return false;
    } else if (err.status === 400) {
      alert('요청이 잘못됐습니다');
    } else if (err.message === 'Network Error') {
      dispatch(logOutAction());
      alert('권한이 없거나 네트워크 연결이 끊겼습니다');
    }
  };
  return { tokenCheck };
};
