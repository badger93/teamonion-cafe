import React, { useState } from 'react';
import MobileHeader from './MobileHeader';
import PcHeader from './PcHeader';
import SignInPopup from './SignInPopup';

const Header = () => {
  const dummyUser = { id: 'hyunjae' };
  const isLogined = false;
  const isAdmin = false;
  const [loginDom, setLoginDom] = useState({});
  return (
    <>
      <MobileHeader isLogined={isLogined} isAdmin={isAdmin} user={dummyUser} />
      <PcHeader
        isLogined={isLogined}
        isAdmin={isAdmin}
        user={dummyUser}
        loginDom={loginDom}
      />
      <div className="signInContainer">
        <SignInPopup setLoginDom={setLoginDom} />
      </div>
    </>
  );
};
export default Header;
