import React, { useState } from 'react';
import axios from 'axios';

const url = '/members/login';

const SignIn = () => {
  const [inputId, setInputID] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [resultId, setResultId] = useState('');
  const getResultId = (id, pw, address) => axios
      .post(address, {
        menberId: id,
        password: pw,
      })
      .then(res => res.member.memberId)
      .catch(err => console.log('로그인 실패', err));

  return (
    <>
      <h1>로그인</h1>
      <div>
        {resultId !== ''
          && typeof resultId === 'string'
          && `${resultId}님 환영합니다`}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return setResultId(getResultId(inputId, inputPw, url));
        }}
      >
        <input type="text" onChange={() => setInputID(inputId)} />
        <input type="password" onChange={() => setInputPw(inputPw)} />
        <input type="submit" value="login" />
      </form>
    </>
  );
};

export default SignIn;
