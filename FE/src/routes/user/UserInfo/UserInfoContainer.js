import React from 'react';
import UserInfoPresenter from './UserInfoPresenter';

const UserInfoContainer = () => {
  const dummyUser = { id: 'hyunjae', point: 10000 };

  return <UserInfoPresenter id={dummyUser.id} point={dummyUser.point} />;
};

export default UserInfoContainer;
