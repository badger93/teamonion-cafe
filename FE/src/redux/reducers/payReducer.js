
import { CARTTOPAY, PAY_REQUEST } from '../actions/payAction';


const initState = {
  itemsForPay: [],
  isPaying: false,
  isPaid: false,

};


const payReducer = (state = initState, action) => {
  switch (action.type) {
    case CARTTOPAY:  {
      return { ...state, itemsForPay: action.data };
    }
    case PAY_REQUEST:
    {
      console.log('im reducer');
      return { ...state };
    }

    default:
      return state;
  }
};

export default payReducer;
