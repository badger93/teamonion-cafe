import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUpPresenter from './SignUpPresenter';

const SignUpContainer = () => {
  const dispatch = useDispatch();
  const { isSigningUp, isSignedUp } = useSelector((state) => state.user);

  return (
    <SignUpPresenter
      dispatch={dispatch}
      isSigningUp={isSigningUp}
      isSignedUp={isSignedUp}
    />
  );
};

export default SignUpContainer;
