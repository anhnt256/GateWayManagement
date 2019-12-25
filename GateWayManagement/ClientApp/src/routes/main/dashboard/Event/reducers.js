import {GET_ALL_GAMES_SUCCESS, GET_RESULT_SUCCESS, SET_CURRENT_GAME} from "../../../../constants/ActionTypes";

const initialState = {
  games: [],
  gameId: 1,
};

function Game(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GAMES_SUCCESS: {
      const {response} = action;
      return {
        ...state,
        games: response,
      };
    }
    case SET_CURRENT_GAME: {
      const {response} = action;
      return {
        ...state,
        gameId: response,
      };
    }
    default: {
      return state;
    }
  }
}
export default Game;
