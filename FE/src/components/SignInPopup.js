import React, {
  useState, useCallback,
} from 'react';
import '../styles/SignInPopup.scss';
import propTypes from 'prop-types';
import { signIn } from '../api/userApi';
import tmonglogo from '../image/tmonglogo.png';
import { closePopup } from '../utils/popup';

const SignInPopup = ({ loginRef }) => {
  const [inputId, setInputID] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [resultId, setResultId] = useState('');

  const submitCallback = useCallback(
    (e) => {
      e.preventDefault();
      console.log(inputId, inputPw);
      if (inputId !== '' && inputPw !== '') {
        signIn(inputId, inputPw, setResultId);
        console.log(resultId);
        closePopup(e, loginRef.current);
      } else {
        alert('정보입력이 필요합니다');
      }
    },
    [inputId, inputPw],
  );

  return (
    <div className="loginPopup">
      <input
        className="closeBtn"
        type="button"
        value="X"
        onClick={(e) => {
          setInputID('');
          setInputPw('');
          closePopup(e, loginRef.current);
        }}
      />
      <img className="login-logo" src={tmonglogo} alt="logo" />
      <form
        onSubmit={(e) => {
          submitCallback(e);
          setInputID('');
          setInputPw('');
        }}
      >
        <div className="id-area">
          <h3>ID</h3>
          <input
            className="idInput"
            type="text"
            onChange={e => setInputID(e.target.value)}
            value={inputId}
          />
        </div>
        <div className="pw-area">
          <h3>PW</h3>
          <input
            className="pwInput"
            type="password"
            onChange={e => setInputPw(e.target.value)}
            value={inputPw}
          />
        </div>
        <p className="signUp">회원가입</p>
        <input className="submitBtn" type="submit" value="로그인" />
      </form>
      <div>{resultId}</div>
    </div>
  );
};

SignInPopup.defaultProps = {
  loginRef: {},
};

SignInPopup.propTypes = {
  loginRef: propTypes.objectOf(propTypes.element),
};

export default SignInPopup;
