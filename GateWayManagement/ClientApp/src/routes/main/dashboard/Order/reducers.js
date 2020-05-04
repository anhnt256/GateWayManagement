import { GET_ALL_RECIPES_SUCCESS } from '../../../../constants/ActionTypes';

const initialState = {
  recipes: [],
};

function Recipe(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES_SUCCESS: {
      const { response } = action;
      return {
        ...state,
        recipes: response,
      };
    }
    default: {
      return state;
    }
  }
}
export default Recipe;
