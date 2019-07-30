import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MobileHeader from './MobileHeader';
import PcHeader from './PcHeader';
import SignInPopup from './SignInPopup';
import { logOutAction, changePoint } from '../redux/actions/userAction';
import { myPointApi } from '../api/userApi';
import Loading from './Loading';
import moment from 'moment';

const Header = () => {
  const { isSignedIn, isSigningIn, me, signInPopup } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isList, setIsList] = useState(false);

  const logOutDispatch = useCallback(() => {
    dispatch(logOutAction());
    localStorage.removeItem('USER');
    localStorage.removeItem('TOKEN'); // 로그아웃시 토큰 삭제
  }, [dispatch]);

  const onRefreshClick = useCallback(() => {
    const myPointAsyncApi = async () => {
      try {
        const { data } = await myPointApi(me.id);
        await dispatch(changePoint(data));
        localStorage.setItem('USER', JSON.stringify({ ...me, point: data })); // 리덕스 state와 로컬스토리지 포인트 변경
      } catch (e) {
        console.log(e);
      }
    };
    myPointAsyncApi();
  }, [me, dispatch]);

  const expireTimeChecker = () => {
    // 로그인시 23시간 이상된 아이디면 자동 로그아웃
    const nowTime = new Date();
    const oldTime = new Date(me.lastSignInTime);
    const gap = moment.duration(nowTime - oldTime).asMinutes();
    console.log(gap);
    return gap > 1380 ? true : false;
  };

  useEffect(() => {
    if (me.lastSignInTime && expireTimeChecker()) {
      dispatch(logOutAction());
    }
  }, []);

  return (
    <>
      <MobileHeader
        logOutDispatch={logOutDispatch}
        isList={isList}
        setIsList={setIsList}
        isSignedIn={isSignedIn}
        user={me}
        dispatch={dispatch}
        onRefreshClick={onRefreshClick}
      />

      <PcHeader
        isSignedIn={isSignedIn}
        user={me}
        logOutDispatch={logOutDispatch}
        onRefreshClick={onRefreshClick}
      />
      {signInPopup && (
        <div className="signInContainer">
          {isSigningIn && <Loading />}
          <SignInPopup isSigningIn={isSigningIn} />
        </div>
      )}
    </>
  );
};
export default Header;
