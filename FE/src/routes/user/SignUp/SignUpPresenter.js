import React from 'react';
import propTypes from 'prop-types';
import SignUpForm from '../../../components/SignUpForm';
import './styles/SignUpPresenter.scss';

const SignUpPresenter = ({ dispatch }) => (
  <div className="signup_wrap">
    <div className="signup_container">
      <div className="signup_title">Sign Up</div>
      <SignUpForm dispatch={dispatch} />
    </div>
  </div>
);

SignUpPresenter.propTypes = { dispatch: propTypes.func.isRequired };

export default SignUpPresenter;
