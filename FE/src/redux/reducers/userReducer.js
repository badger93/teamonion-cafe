import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_REQUEST,
  LOG_OUT,
  SIGNIN_POPUP_CHANGE,
  CHANGE_POINT,
  SIGNUP_FINISH,
} from '../actions/userAction';

const initState = {
  isSigningIn: false,
  isSignedIn: !!localStorage.getItem('USER'), // 더미
  signInErrorReason: '',
  isSigningOut: false,
  isSigningUp: false,
  isSignedUp: false,
  signUpErrorReason: '',
  signInPopup: false, // 로그인 팝업창 띄울지 말지
  me: localStorage.getItem('USER')
    ? JSON.parse(localStorage.getItem('USER'))
    : {
        id: -1,
        memberId: '',
        memberRole: 'NORMAL',
        point: 0,
        jwt: null,
      },
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpErrorReason: '',
      };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, isSigningUp: false, isSignedUp: true };
    }
    case SIGNUP_FAILURE: {
      return { ...state, isSigningUp: false, signUpErrorReason: action.error };
    }
    case SIGNUP_FINISH: {
      return { ...state, isSignedUp: false };
    }

    case SIGNIN_REQUEST: {
      return {
        ...state,
        isSigningIn: true,
        isSignedIn: false,
        signInErrorReason: '',
      };
    }
    case SIGNIN_SUCCESS: {
      localStorage.setItem('USER', JSON.stringify(action.data));
      localStorage.setItem('TOKEN', action.data.jwt); // 로그인 성공시 로컬에 토큰저장
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: true,
        signInPopup: !state.signInPopup,
        me: { ...action.data },
      };
    }
    case SIGNIN_FAILURE: {
      return { ...state, isSigningIn: false, signInErrorReason: action.error };
    }
    case SIGNIN_POPUP_CHANGE: {
      return { ...state, signInPopup: !state.signInPopup };
    }
    case CHANGE_POINT: {
      localStorage.setItem('USER', JSON.stringify({ ...state.me, point: action.data }));
      return { ...state, me: { ...state.me, point: action.data } };
    }
    case LOG_OUT: {
      localStorage.removeItem('USER');
      localStorage.removeItem('TOKEN'); // 로그아웃시 토큰 삭제
      return {
        ...state,
        isSignedIn: false,
        me: {
          id: -1,
          memberId: '',
          memberRole: 'NORMAL',
          point: 0,
          jwt: null,
        },
      };
    }

    default:
      return state;
  }
};

export default userReducer;
