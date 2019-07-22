import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_REQUEST,
  LOG_OUT,
} from '../actions/userAction';

const initState = {
  isSigningIn: false,
  isSignedIn: false,
  signInErrorReason: '',
  isSigningOut: false,
  isSigningUp: false,
  isSignedUp: false,
  signUpErrorReason: '',
  me: {
    id: -1, memberId: '', memberRole: 'NORMAL', point: 0, jwt: null,
  },

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
