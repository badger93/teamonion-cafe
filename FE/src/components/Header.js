import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MobileHeader from './MobileHeader';
import PcHeader from './PcHeader';
import SignInPopup from './SignInPopup';
import {
  logOutAction, signInRefRegisterAction, changePoint,
} from '../redux/actions/userAction';
import { myPointApi } from '../api/userApi';

const Header = () => {
  const { isSignedIn, me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const loginRef = useRef(null); // 애를 리덕스에 넣자
  const [isList, setIsList] = useState(false);
  const [isLoginPopup, setIsLoginPopup] = useState(false);

  const logOutDispatch = useCallback(
    () => {
      dispatch(logOutAction());
    },
    [dispatch],
  );
  useEffect(() => {
    dispatch(signInRefRegisterAction(loginRef));
  }, []);

  const onRefreshClick = useCallback(() => {
    async function myPointAsyncApi() {
      try {
        const changedPoint = await myPointApi(me.id);
        await dispatch(changePoint(changedPoint)); // 리덕스 state와 로컬스토리지 포인트 변경
      } catch (e) {
        console.log(e);
      }
    }
    myPointAsyncApi();
  }, []);

  return (
    <>
      <MobileHeader
        logOutDispatch={logOutDispatch}
        isList={isList}
        setIsList={setIsList}
        isSignedIn={isSignedIn}
        user={me}
        setIsLoginPopup={setIsLoginPopup}
        dispatch={dispatch}
      />

      <PcHeader
        isSignedIn={isSignedIn}
        user={me}
        logOutDispatch={logOutDispatch}
        setIsLoginPopup={setIsLoginPopup}
        onRefreshClick={onRefreshClick}
      />
      {isLoginPopup
      && (
      <div className="signInContainer" ref={loginRef}>
        <SignInPopup setIsLoginPopup={setIsLoginPopup} />
      </div>
      )}
    </>
  );
};
export default Header;
