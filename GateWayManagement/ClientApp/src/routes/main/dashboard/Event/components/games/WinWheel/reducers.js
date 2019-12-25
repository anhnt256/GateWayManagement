import {
  CHECK_ROUND_SUCCESS,
  GET_RESULT_SUCCESS,
  CALC_ROUND_SUCCESS,
} from '../../../../../../../constants/ActionTypes';

const initialState = {
  gameResults: [],
  round: 0,
};

function gameResult(state = initialState, action) {
  switch (action.type) {
    case GET_RESULT_SUCCESS: {
      const { response } = action;
      return {
        ...state,
        gameResults: response,
      };
    }
    case CHECK_ROUND_SUCCESS: {
      const { response } = action;
      return {
        ...state,
        round: response,
      };
    }
    case CALC_ROUND_SUCCESS: {
      const { response } = action;
      return {
        ...state,
        round: response,
      };
    }
    default: {
      return state;
    }
  }
}

export default gameResult;
