import React, { useState } from 'react';
import '../styles/SignInPopup.scss';
import { signIn } from '../api/userApi';
import tmonglogo from '../image/tmonglogo.png';
import { closePopup } from '../utils/popup';

const SignInPopup = () => {
  const [inputId, setInputID] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [resultId, setResultId] = useState('');

  return (
    <div className="loginPopup">
      <input
        className="closeBtn"
        type="button"
        value="X"
        onClick={e => closePopup(e, document.querySelector('.loginPopup'))}
      />
      <img className="login-logo" src={tmonglogo} alt="logo" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn(inputId, inputPw, setResultId);
        }}
      >
        <div className="id-area">
          <h3>ID</h3>
          <input
            className="idInput"
            type="text"
            onChange={() => setInputID(inputId)}
          />
        </div>
        <div className="pw-area">
          <h3>PW</h3>
          <input
            className="pwInput"
            type="password"
            onChange={() => setInputPw(inputPw)}
          />
        </div>
        <p className="signUp">회원가입</p>
        <input className="submitBtn" type="submit" value="로그인" />
      </form>
      <div>{resultId}</div>
    </div>
  );
};

export default SignInPopup;
