import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_REQUEST,
  LOG_OUT, SIGNIN_REF_REGISTER,
} from '../actions/userAction';

const initState = {
  isSigningIn: false,
  isSignedIn: false, // 더미
  signInErrorReason: '',
  isSigningOut: false,
  isSigningUp: false,
  isSignedUp: false,
  signUpErrorReason: '',
  signInRef: null, // 로그인 팝업창 Ref정보
  me: {
    id: -1, memberId: '', memberRole: 'NORMAL', point: 0, jwt: null,
  },
  // me: {// dummy login data
  //   id: 1,
  //   memberId: 'onion',
  //   memberRole: 'NORMAL',
  //   point: 1000000,
  //   jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6Im9uaW9uMjIiLCJyb2xlIjoiTk9STUFMIiwiZXhwIjoxNTYzODYwNzI5fQ.Nz4hWZU11NE3WLpDYXHQN_5vnWq6GCs2QNKVj1CyOuU',
  // },
};


const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      return {
        ...state, isSigningUp: true, isSignedUp: false, signUpErrorReason: '',
      };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, isSigningUp: false, isSignedUp: true };
    }
    case SIGNUP_FAILURE: {
      return { ...state, isSigningUp: false, signUpErrorReason: action.error };
    }
    case SIGNIN_REQUEST: {
      return {
        ...state, isSigningIn: true, isSignedIn: false, signInErrorReason: '',
      };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state, isSigningIn: false, isSignedIn: true, me: { ...action.data },
      };
    }
    case SIGNIN_FAILURE: {
      return { ...state, isSigningIn: false, signInErrorReason: action.error };
    }
    case SIGNIN_REF_REGISTER: {
      return { ...state, signInRef: action.data };
    }

    case LOG_OUT: {
      return {
        ...state,
        isSignedIn: false,
        me: {
          id: -1, memberId: '', memberRole: 'NORMAL', point: 0, jwt: null,
        },
      };
    }

    default:
      return state;
  }
};

export default userReducer;
