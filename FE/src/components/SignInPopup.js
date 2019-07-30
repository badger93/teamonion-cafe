import React, { useState, useCallback, useRef, useEffect } from 'react';
import '../styles/SignInPopup.scss';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import tmonglogo from '../image/tmonglogo.png';
import { signInRequestAction, signInPopupChangeAction } from '../redux/actions/userAction';
import { useShowupString } from '../utils/signUpForm';
import ShowUpMessage from './ShowUpMessage';

const SignInPopup = ({ setIsLoginPopup }) => {
  const [inputId, setInputID] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [resultId] = useState('');
  const [isStayLogin, setIsStayLogin] = useState(true);
  const { setShowupStringFunc, showupString, isShowing } = useShowupString('');

  const dispatch = useDispatch();
  const { signInErrorReason } = useSelector(state => state.user);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowupStringFunc(signInErrorReason);
    }
  }, [signInErrorReason]);

  const submitCallback = useCallback(
    e => {
      e.preventDefault();
      if (inputId !== '' && inputPw !== '') {
        dispatch(signInRequestAction({ memberId: inputId, password: inputPw, isStayLogin }));
        setIsLoginPopup('false');
      } else {
        setShowupStringFunc('정보입력이 필요합니다');
      }
    },
    [inputId, inputPw, dispatch, setIsLoginPopup, setShowupStringFunc],
  );

  const popupControl = useCallback(() => {
    dispatch(signInPopupChangeAction());
  }, [dispatch]);

  return (
    <div className="loginPopup">
      <input
        className="closeBtn"
        type="button"
        value="X"
        onClick={() => {
          setInputID('');
          setInputPw('');
          popupControl();
        }}
      />
      <img className="login-logo" src={tmonglogo} alt="logo" />
      <form
        onSubmit={e => {
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
        <div className="bottom-row">
          <div>
            <input
              className="bottom-row-checkbox"
              type="checkbox"
              defaultChecked="checked"
              onClick={() => setIsStayLogin(prev => !prev)}
            />
            <span>로그인 상태 유지</span>
          </div>
          <div className="signUp" onClick={() => popupControl()}>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
        <ShowUpMessage isShowing={isShowing} showupString={showupString} />
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
