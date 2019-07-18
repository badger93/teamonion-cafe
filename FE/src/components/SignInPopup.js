import React, { useState } from 'react';
import '../styles/SignInPopup.scss';
import signIn from '../api/userApi';

const SignInPopup = () => {
  const [inputId, setInputID] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [resultId, setResultId] = useState('');

  return (
    <div className="loginPopup">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResultId(signIn(inputId, inputPw));
        }}
      >
        <input
          className="idInput"
          type="text"
          onChange={() => setInputID(inputId)}
        />
        <input
          className="pwInput"
          type="password"
          onChange={() => setInputPw(inputPw)}
        />
        <input className="submitBtn" type="submit" value="login" />
      </form>
      <div>{resultId}</div>
    </div>
  );
};

export default SignInPopup;
