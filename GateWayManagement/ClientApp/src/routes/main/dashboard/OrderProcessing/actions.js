import request from '../../../../util/request';
import { GET_ALL_ORDER_DETAIL_SUCCESS, GET_ALL_ORDER_SUCCESS } from '../../../../constants/ActionTypes';

export function getListOrder() {
  return async (dispatch) => {
    const response = await request.get('api/order/GetAllOrder');

    if (response.data.responseCode === 0) {
      dispatch({
        type: GET_ALL_ORDER_SUCCESS,
        response: response.data.reply,
      });
    }
    return 0;
  };
}

export function getListOrderDetail(order_id) {
  return async (dispatch) => {
    const response = await request.get('api/order/GetAllOrderDetail', { order_id });

    if (response.data.responseCode === 0) {
      dispatch({
        type: GET_ALL_ORDER_DETAIL_SUCCESS,
        response: response.data.reply,
      });
    }
    return 0;
  };
}
