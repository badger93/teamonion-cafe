import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/SignUpForm.scss';
import { duplicateCheckApi } from '../api/signUpApi';

const SignUpForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (
        password.length === 0 ||
        passwordCheck.length === 0 ||
        id.length === 0
      ) {
        // 안적었을시 제한
        alert('추가 입력이 필요합니다');
        return;
      }
      if (password !== passwordCheck) {
        // 비밀번호 다를 시 제한
        alert('비밀번호가 다릅니다!');
        return;
      }
      if (duplicateError) {
        alert('ID 중복검사가 필요합니다');
        return;
      }
      // 사가에 회원가입 리퀘스트 액션 디스패치
      console.log({ id, password });
    },
    [password, passwordCheck, duplicateError, setPasswordError],
  );

  const onDuplicateSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (id.length > 0) {
        // const result = duplicateCheckApi({memberID:id})
        console.log(id);
        // alert(result);
        // if (result) {
        //   setDuplicateError(false);
        // } else {
        //   setDuplicateError(true);
        // }
      }
    },
    [id],
  );

  const onChangeId = useCallback((e) => {
    if (e.target.value.length < 10) {
      // 10글자 제한
      setId(e.target.value);
    }
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password); // 비밀번호체크
      setPasswordCheck(e.target.value);
    },
    [password],
  );

  return (
    <form onSubmit={onSubmit} className="signup_form">
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
          placeholder="비밀번호를 입력해주세요"
          className="signup_input"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="signup_form_row">
        <input
          type="password"
          placeholder="비밀번호를 확인해주세요"
          className="signup_input"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
      </div>
      {passwordError && (
        <div style={{ color: 'red' }}>비밀번호가 다릅니다!</div>
      )}

      <div className="signup_form_row signup_form_submit">
        <button className="submit_button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
