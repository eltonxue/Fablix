import {
  LOGIN_EMPLOYEE,
  LOGIN_EMPLOYEE_LOADED,
  LOGIN_EMPLOYEE_ERROR,
  CLEAR_EMPLOYEE_REDUCER,
} from './constants';

export const loginEmployee = (cred) => ({
  type: LOGIN_EMPLOYEE,
  credential: cred,
});

export const loginEmployeeLoaded = (data) => ({
  type: LOGIN_EMPLOYEE_LOADED,
  data,
});

export const loginEmployeeError = (error) => ({
  type: LOGIN_EMPLOYEE_ERROR,
  error,
});

export const clearEmployeeReducer = () => ({
  type: CLEAR_EMPLOYEE_REDUCER,
});
