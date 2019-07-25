import { CARTTOPAY, PAY_REQUEST, PAY_SUCCESS, PAY_FAILURE, PAY_FINISH } from '../actions/payAction';

const initState = {
  itemsForPay: [],
  isPaying: false,
  isPaid: false,
};

const payReducer = (state = initState, action) => {
  switch (action.type) {
    case CARTTOPAY: {
      return { ...state, itemsForPay: action.data };
    }
    case PAY_REQUEST: {
      return { ...state, isPaying: true, isPaid: false };
    }
    case PAY_SUCCESS: {
      return { ...state, isPaying: false, isPaid: true };
    }
    case PAY_FAILURE: {
      return { ...state, isPaying: false, isPaid: false };
    }
    case PAY_FINISH: {
      return { ...state, isPaid: false };
    }

    default:
      return state;
  }
};

export default payReducer;
