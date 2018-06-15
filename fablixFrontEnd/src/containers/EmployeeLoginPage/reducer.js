// import { fromJS } from 'immutable';

import {
  LOGIN_EMPLOYEE,
  LOGIN_EMPLOYEE_LOADED,
  LOGIN_EMPLOYEE_ERROR,
  CLEAR_EMPLOYEE_REDUCER,
  CLEAR_EMPLOYEE_REDUCER_LOADED,
} from './constants';

const initialState = {
  employeeData: null,
  employeeLoginLoading: null,
  employeeLoginLoaded: null,
  employeeLoginError: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_EMPLOYEE:
      return {
        ...state,
        employeeLoginLoading: true,
        employeeLoginError: null,
      };
    case LOGIN_EMPLOYEE_LOADED:
      return {
        ...state,
        employeeData: action.data,
        employeeLoginLoading: false,
        employeeLoginLoaded: true,
        employeeLoginError: null,
      };
    case LOGIN_EMPLOYEE_ERROR:
      console.log('aaaaa', action);
      return {
        ...state,
        employeeLoginLoading: false,
        employeeLoginLoaded: false,
        employeeLoginError: action.error,
      };
    case CLEAR_EMPLOYEE_REDUCER_LOADED:
      console.log('cleared employee reducer');
      return {
        employeeData: null,
        employeeLoginLoading: false,
        employeeLoginLoaded: false,
        employeeLoginError: null,
      };
    default:
      return state;
  }
};

export default employeeReducer;
