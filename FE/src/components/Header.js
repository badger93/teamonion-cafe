import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MobileHeader from './MobileHeader';
import PcHeader from './PcHeader';
import SignInPopup from './SignInPopup';
import { logOutAction, changePoint } from '../redux/actions/userAction';
import { myPointApi } from '../api/userApi';

const Header = () => {
  const { isSignedIn, isSigningIn, me, signInPopup } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isList, setIsList] = useState(false);

  const logOutDispatch = useCallback(() => {
    dispatch(logOutAction());
  }, [dispatch]);

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
        dispatch={dispatch}
      />

      <PcHeader
        isSignedIn={isSignedIn}
        user={me}
        logOutDispatch={logOutDispatch}
        onRefreshClick={onRefreshClick}
      />
      {signInPopup && (
        <div className="signInContainer">
          <SignInPopup isSigningIn={isSigningIn} />
        </div>
      )}
    </>
  );
};
export default Header;
