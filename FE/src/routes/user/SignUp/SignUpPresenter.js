import React from 'react';
import propTypes from 'prop-types';
import SignUpForm from '../../../components/SignUpForm';
import './styles/SignUpPresenter.scss';
import Loading from '../../../components/Loading';

const SignUpPresenter = ({
  dispatch, isSigningUp,
  isSignedUp,
}) => (
  <div className="signup_wrap">
    <div className="signup_container">
      <div className="signup_title">Sign Up</div>
      <SignUpForm
        dispatch={dispatch}
        isSigningUp={isSigningUp}
        isSignedUp={isSignedUp}
      />
    </div>
  </div>
);

SignUpPresenter.propTypes = {
  dispatch: propTypes.func.isRequired,
  isSigningUp: propTypes.bool.isRequired,
  isSignedUp: propTypes.bool.isRequired,
};

export default SignUpPresenter;
