import request from '../../../../util/request';
import { GET_ALL_RECIPES_SUCCESS } from '../../../../constants/ActionTypes';

export function getListRecipe() {
  return async (dispatch) => {
    const response = await request.get('api/recipe/GetAllRecipe');

    if (response.data.responseCode === 0) {
      dispatch({
        type: GET_ALL_RECIPES_SUCCESS,
        response: response.data.reply,
      });
    }
    return 0;
  };
}
