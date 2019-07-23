import React, {
  useState, useCallback,
} from 'react';
import '../styles/SignInPopup.scss';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../api/userApi';
import tmonglogo from '../image/tmonglogo.png';
import { closePopup } from '../utils/popup';
import { signInRequestAction } from '../redux/actions/userAction';

const SignInPopup = ({ loginRef }) => {
  const [inputId, setInputID] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [resultId, setResultId] = useState('');
  const dispatch = useDispatch();

  const submitCallback = useCallback(
    (e) => {
      e.preventDefault();
      // console.log(inputId, inputPw);
      if (inputId !== '' && inputPw !== '') {
        dispatch(signInRequestAction({ memberId: inputId, password: inputPw }));
        // signIn(inputId, inputPw, setResultId);
        // console.log(resultId);
        closePopup(e, loginRef.current);
      } else {
        alert('정보입력이 필요합니다');
      }
    },
    [inputId, inputPw, dispatch, loginRef],
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
        <div
          className="signUp"
          onClick={(e) => {
            closePopup(e, loginRef.current);
          }}
        >
          <Link to="/signup">회원가입</Link>
        </div>
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
