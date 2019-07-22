import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/userAction';

const initState = {
  isAdmin: false,
  isLoggingIn: false,
  isLoginedIn: false,
  logInErrorReason: '',
  isLoggingOut: false,
  isSigningUp: false,
  isSignedUp: false,
  signUpErrorReason: '',
  me: {},

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

    default:
      return state;
  }
};

export default userReducer;
