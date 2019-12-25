import request from '../../util/request';
import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
} from '../../constants/ActionTypes';
import { findLocalIp } from '../../util/ipAddress';
import {setCurrentGame} from "../../routes/main/dashboard/Event/actions";

export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user,
  };
};

export const userSignIn = (user) => {
  return async (dispatch) => {
    const localAddress = await findLocalIp();
    const response = await request.post('api/user/signin', {ip: localAddress[0], username: user});
    if (response.data.responseCode === 0) {
      localStorage.setItem('user_id', response.data.reply.userId);
      dispatch(setCurrentGame(1));
      dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: response.data.reply,
      });
    }
  };
};

export const checkUser = () => {
  return async (dispatch) => {
    const localAddress = await findLocalIp();
    const response = await request.post('api/user/autologin', {ip: localAddress[0]});
    if (response.data.responseCode === 0 && (response.data.reply.userName !== '' || response.data.reply.userName !== null)) {
      localStorage.setItem('user_id', response.data.reply.userId);
      dispatch(setCurrentGame(1));
      dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: response.data.reply,
      });
    }
  };
};

export const userSignOut = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  };
};
export const userSignUpSuccess = (authUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser,
  };
};

export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser,
  };
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message,
  };
};

export const userGoogleSignIn = () => {
  return {
    type: SIGNIN_GOOGLE_USER,
  };
};
export const userGoogleSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GOOGLE_USER_SUCCESS,
    payload: authUser,
  };
};
export const userFacebookSignIn = () => {
  return {
    type: SIGNIN_FACEBOOK_USER,
  };
};
export const userFacebookSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser,
  };
};
export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};
export const userTwitterSignIn = () => {
  return {
    type: SIGNIN_TWITTER_USER,
  };
};
export const userTwitterSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_TWITTER_USER_SUCCESS,
    payload: authUser,
  };
};
export const userGithubSignIn = () => {
  return {
    type: SIGNIN_GITHUB_USER,
  };
};
export const userGithubSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GITHUB_USER_SUCCESS,
    payload: authUser,
  };
};
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};
