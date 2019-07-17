import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import SignUpForm from '../../../components/SignUpForm';
import '../../../styles/SignUpPresenter.scss';

const SignUpPresenter = () => {
  return (
    <div className="signup_wrap">
      <div className="signup_container">
        <div className="signup_title">Sign Up</div>
        <SignUpForm />
      </div>
    </div>
  );
};

SignUpPresenter.propTypes = {};

export default SignUpPresenter;
