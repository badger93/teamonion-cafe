import axios from 'axios';

export const duplicateCheckApi = data => axios.post('/api/members/overlap', data);

export const signUpSubmitApi = data => axios.post('/api/members', data);

const signInUrl = 'api/members/login';

export const signIn = async (id, pw, callback) => {
  axios
    .get(signInUrl, {
      memberId: id,
      password: pw,
    })
    .then(res => callback(res.data.memberId))
    .catch(err => alert('로그인 실패', err));
};
