import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MobileHeader from './MobileHeader';
import PcHeader from './PcHeader';
import SignInPopup from './SignInPopup';
import { logOutAction, changePoint } from '../redux/actions/userAction';
import { myPointApi } from '../api/userApi';
import Loading from './Loading';

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
