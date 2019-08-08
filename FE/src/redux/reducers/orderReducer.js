import { SET_CHANGED_ORDER, SEND_ORDER_STATE } from '../actions/orderAction';

const initState = {
  changed_order: {},
  sendOrderState: {},
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CHANGED_ORDER: {
      return { ...state, changed_order: action.data };
    }
    case SEND_ORDER_STATE: {
      return { ...state, sendOrderState: action.data };
    }
    default:
      return state;
  }
};

export default orderReducer;
