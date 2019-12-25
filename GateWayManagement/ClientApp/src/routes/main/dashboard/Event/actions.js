import request from '../../../../util/request';
import { GET_ALL_GAMES_SUCCESS, SET_CURRENT_GAME } from '../../../../constants/ActionTypes';
import { findLocalIp } from '../../../../util/ipAddress';
import { userSignOut } from '../../../../general/Auth/actions';

export function getListEvent() {
  return async (dispatch) => {
    const response = await request.get('api/game/GetAllGames');

    if (response.data.responseCode === 0) {
      dispatch({
        type: GET_ALL_GAMES_SUCCESS,
        response: response.data.reply,
      });
    }
    return 0;
  };
}

export function setCurrentGame(gameId) {
  return async (dispatch, getState) => {
    const localAddress = await findLocalIp();
    const userId = getState().auth.authUser;
    const response = await request.post('api/game/UserGameMap', { ip: localAddress[0], gameId, userId });
    if (response.data.responseCode === 0) {
      dispatch({
        type: SET_CURRENT_GAME,
        response: gameId,
      });
    } else if (response.data.responseCode === 1) {
      dispatch(userSignOut());
    }
    return 0;
  };
}
