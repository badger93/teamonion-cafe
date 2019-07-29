import React, { useState, useCallback } from 'react';
import '../styles/SignUpForm.scss';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { duplicateCheckApi } from '../api/userApi';
import { signUpRequestAction } from '../redux/actions/userAction';
import { useShowupString } from '../utils/signUpForm';
import ShowUpMessage from './ShowUpMessage';

const SignUpForm = ({ dispatch, isSigningUp, isSignedUp }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [duplicateError, setDuplicateError] = useState(true);

  const { setShowupStringFunc, showupString, isShowing } = useShowupString('');
  // 문자열을 잠시 띄우는 커스텀 훅

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password.length === 0 || passwordCheck.length === 0 || id.length === 0) {
        // 안적었을시 제한
        setShowupStringFunc('추가입력이 필요합니다');
        return;
      }
      if (!/^[a-zA-Z0-9]{8,16}$/.test(password)) {
        setShowupStringFunc('password는 8~16자 입력과 영문,숫자조합이 필요합니다');
        return;
      }
      if (password !== passwordCheck) {
        // 비밀번호 다를 시 제한

        setShowupStringFunc('비밀번호가 다릅니다!');
        return;
      }
      if (duplicateError) {
        setShowupStringFunc('ID 중복검사가 필요합니다');
        return;
      }
      // 사가에 회원가입 리퀘스트 액션 디스패치

      dispatch(signUpRequestAction({ memberId: id, password, passwordCheck }));
    },
    [id, password, passwordCheck, duplicateError, dispatch, setShowupStringFunc],
  );

  const onDuplicateSubmit = useCallback(
    e => {
      e.preventDefault();
      const duplicate = async () => {
        try {
          if (id.length > 0) {
            const { data } = await duplicateCheckApi(id);

            // const result = false;
            if (data) {
              setShowupStringFunc('이미 있는 아이디입니다');
              setDuplicateError(true);
            } else {
              setShowupStringFunc('사용가능한 아이디입니다');
              setDuplicateError(false);
            }
          }
        } catch (e) {
          console.log(e);
        }
      };
      duplicate();
    },
    [id, setShowupStringFunc],
  );

  const onChangeId = useCallback(e => {
    if (e.target.value.length < 16) {
      // 16글자 제한
      setId(e.target.value);
    }
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordError(e.target.value !== password); // 비밀번호체크
      setPasswordCheck(e.target.value);
    },
    [password],
  );

  return (
    <form onSubmit={onSubmit} className="signup_form">
      {isSignedUp && <Redirect to="/" />}
      <div className="signup_form_row">
        <input
          type="id"
          placeholder="ID를 입력해 주세요"
          className="signup_input signup_id_input"
          value={id}
          onChange={onChangeId}
        />
        <button type="submit" onClick={onDuplicateSubmit}>
          중복검사
        </button>
      </div>
      <div className="signup_form_row">
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요(8~16자, 숫자포함)"
          className="signup_input"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="signup_form_row">
        <input
          type="password"
          placeholder="비밀번호를 확인해주세요8~16자, 숫자포함)"
          className="signup_input"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
      </div>
      {passwordError && <div style={{ color: 'red' }}>비밀번호가 다릅니다!</div>}
      <ShowUpMessage isShowing={isShowing} showupString={showupString} />
      <div className="signup_form_row signup_form_submit">
        <button className="submit_button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  isSigningUp: propTypes.bool.isRequired,
  isSignedUp: propTypes.bool.isRequired,
};

export default SignUpForm;
