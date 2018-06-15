import { LOGIN_USER, LOGIN_USER_LOADED, LOGIN_USER_ERROR, CLEAR_USER_REDUCER } from './constants';

export const loginUser = (cred) => ({
  type: LOGIN_USER,
  credential: cred,
});

export const loginUserLoaded = (data) => ({
  type: LOGIN_USER_LOADED,
  data,
});

export const loginUserError = (error) => ({
  type: LOGIN_USER_ERROR,
  error,
});

export const clearUserReducer = () => ({
  type: CLEAR_USER_REDUCER,
});
