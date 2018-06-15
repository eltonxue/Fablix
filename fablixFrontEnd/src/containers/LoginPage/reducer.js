// import { fromJS } from 'immutable';

import {
  LOGIN_USER,
  LOGIN_USER_LOADED,
  LOGIN_USER_ERROR,
  CLEAR_USER_REDUCER_LOADED,
} from './constants';

const initialState = {
  userData: null,
  userLoginLoading: null,
  userLoginLoaded: null,
  userLoginError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userLoginLoading: true,
        userLoginError: null,
      };
    case LOGIN_USER_LOADED:
      return {
        ...state,
        userData: action.data,
        userLoginLoading: false,
        userLoginLoaded: true,
        userLoginError: null,
      };
    case LOGIN_USER_ERROR:
      console.log('aaaaa', action);
      return {
        ...state,
        userLoginLoading: false,
        userLoginLoaded: false,
        userLoginError: action.error,
      };
    case CLEAR_USER_REDUCER_LOADED:
      console.log('cleared user reducer');
      return {
        userData: null,
        userLoginLoading: false,
        userLoginLoaded: false,
        userLoginError: null,
      };
    default:
      return state;
  }
};

export default userReducer;
