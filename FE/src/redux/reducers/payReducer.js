
import { CARTTOPAY, PAY_REQUEST } from '../actions/payAction';


const initState = {};


const payReducer = (state = initState, action) => {
  switch (action.type) {
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
