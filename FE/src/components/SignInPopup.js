import React, {
  useState, useCallback,
} from 'react';
import '../styles/SignInPopup.scss';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import tmonglogo from '../image/tmonglogo.png';
import { signInRequestAction } from '../redux/actions/userAction';

const SignInPopup = ({ setIsLoginPopup }) => {
  const [inputId, setInputID] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [resultId] = useState('');
  const dispatch = useDispatch();

  const submitCallback = useCallback(
    (e) => {
      e.preventDefault();
      if (inputId !== '' && inputPw !== '') {
        dispatch(signInRequestAction({ memberId: inputId, password: inputPw }));
        setIsLoginPopup('false');
      } else {
        alert('정보입력이 필요합니다');
      }
    },
    [inputId, inputPw, dispatch, setIsLoginPopup],
  );

  return (
    <div className="loginPopup">
      <input
        className="closeBtn"
        type="button"
        value="X"
        onClick={() => {
          setInputID('');
          setInputPw('');
          setIsLoginPopup(false);
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
        <div className="signUp" onClick={() => setIsLoginPopup(false)}>
          <Link to="/signup">회원가입</Link>
        </div>
        <input className="submitBtn" type="submit" value="로그인" />
      </form>
      <div>{resultId}</div>
    </div>
  );
};

SignInPopup.defaultProps = {
  setIsLoginPopup: () => {},
};

SignInPopup.propTypes = {
  setIsLoginPopup: propTypes.func,
};

export default SignInPopup;
