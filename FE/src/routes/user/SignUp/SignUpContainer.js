import React from 'react';
import {useDispatch} from "react-redux";
import SignUpPresenter from './SignUpPresenter';

const SignUpContainer = () => {
  const dispatch = useDispatch();

  return <SignUpPresenter dispatch={dispatch} />;
};

export default SignUpContainer;
