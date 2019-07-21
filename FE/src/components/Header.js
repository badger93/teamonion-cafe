import React, { useRef } from 'react';
import MobileHeader from './MobileHeader';
import PcHeader from './PcHeader';
import SignInPopup from './SignInPopup';

const Header = () => {
  const dummyUser = { id: 'hyunjae' };
  const isLogined = false;
  const isAdmin = false;
  const loginRef = useRef(null);

  return (
    <>
      <MobileHeader isLogined={isLogined} isAdmin={isAdmin} user={dummyUser} loginRef={loginRef} />
      <PcHeader
        isLogined={isLogined}
        isAdmin={isAdmin}
        user={dummyUser}
        loginRef={loginRef}
      />
      <div className="signInContainer" ref={loginRef}>
        <SignInPopup loginRef={loginRef} />
      </div>
    </>
  );
};
export default Header;
