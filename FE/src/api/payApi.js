import axios from 'axios';

export function payAPI(action) {
  // 서버에 요청을 보내는 부분
  return axios.post(`/api/${action.data.member_id}/orders`, { ...action.data });
}
