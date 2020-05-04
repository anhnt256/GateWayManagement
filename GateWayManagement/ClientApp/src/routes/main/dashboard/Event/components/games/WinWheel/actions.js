import { findLocalIp } from '../../../../../../../util/ipAddress';
import request from '../../../../../../../util/request';
import {
  GET_RESULT_SUCCESS,
  CHECK_ROUND_SUCCESS,
  CALC_ROUND_SUCCESS,
  SEARCH_CODE_SUCCESS,
} from '../../../../../../../constants/ActionTypes';
import { userSignOut } from '../../../../../../../general/Auth/actions';

export function calcPrize() {
  return async (dispatch, getState) => {
    const gameId = getState().game.gameId;
    const userId = getState().auth.authUser;
    const localAddress = await findLocalIp();
    const response = await request.post('api/game/calcprize', { ip: localAddress[0], gameId, userId });

    if (response.data.responseCode === 0) {
      await dispatch(checkRound(gameId));
      return response;
    } else if (response.data.responseCode === 1) {
      dispatch(userSignOut());
    }
    return 0;
  };
}

export function getResult() {
  return async (dispatch, getState) => {
    const gameId = getState().game.gameId;
    const userId = getState().auth.authUser;
    const localAddress = await findLocalIp();
    const response = await request.post('api/game/GetResult', { ip: localAddress[0], gameId, userId });

    if (response.data.responseCode === 0) {
      dispatch({
        type: GET_RESULT_SUCCESS,
        response: response.data.reply,
      });
    } else if (response.data.responseCode === 1) {
      dispatch(userSignOut());
    }
    return 0;
  };
}

export function useCode(code = '') {
  return async (dispatch, getState) => {
    const gameId = getState().game.gameId;
    const localAddress = await findLocalIp();
    const response = await request.post('api/game/useCode', { ip: localAddress[0], code, gameId });

    if (response.data.responseCode === 0) {
      getResult(gameId);
    }
    return 0;
  };
}

export function searchCode(code = '') {
  return async (dispatch, getState) => {
    const gameId = getState().game.gameId;
    const localAddress = await findLocalIp();
    const response = await request.post('api/game/searchCode', { ip: localAddress[0], code, gameId });

    if (response.data.responseCode === 0) {
      dispatch({
        type: SEARCH_CODE_SUCCESS,
        response: response.data.reply,
      });
    }
    return 0;
  };
}

export function checkRound() {
  return async (dispatch, getState) => {
    const gameId = getState().game.gameId;
    const userId = getState().auth.authUser;
    const localAddress = await findLocalIp();
    const response = await request.post('api/game/CheckRound', { ip: localAddress[0], gameId, userId });

    if (response.data.responseCode === 0) {
      dispatch({
        type: CHECK_ROUND_SUCCESS,
        response: response.data.reply,
      });
    } else if (response.data.responseCode === 1) {
      dispatch(userSignOut());
    }
    return 0;
  };
}

export function calcRound() {
  return async (dispatch, getState) => {
    const gameId = getState().game.gameId;
    const userId = getState().auth.authUser;
    const localAddress = await findLocalIp();
    const response = await request.post('api/game/CalcRound', { ip: localAddress[0], gameId, userId });

    if (response.data.responseCode === 0) {
      dispatch({
        type: CALC_ROUND_SUCCESS,
        response: response.data.reply,
      });
    } else if (response.data.responseCode === 1) {
      dispatch(userSignOut());
    }
    return 0;
  };
}
