import { GET_ALL_ORDER_SUCCESS, GET_ALL_ORDER_DETAIL_SUCCESS } from '../../../../constants/ActionTypes';

const initialState = {
  orders: [],
  detail: [],
};

function Order(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDER_SUCCESS: {
      const { response } = action;
      return {
        ...state,
        orders: response,
      };
    }
    case GET_ALL_ORDER_DETAIL_SUCCESS: {
      const { response } = action;
      return {
        ...state,
        detail: response,
      };
    }
    default: {
      return state;
    }
  }
}
export default Order;
