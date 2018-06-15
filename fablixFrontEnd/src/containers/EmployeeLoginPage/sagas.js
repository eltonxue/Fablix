import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import { loginEmployeeLoaded, loginEmployeeError } from './actions';
import { clearCart } from '../ShoppingCart/actions';
import { api } from '../../config';

import { LOGIN_EMPLOYEE, CLEAR_EMPLOYEE_REDUCER, CLEAR_EMPLOYEE_REDUCER_LOADED } from './constants';

const postLogin = (credential) => {
  console.log('jsdfs', credential);
  console.log(`${api}`);

  const data = queryString.stringify({
    email: credential.email,
    password: credential.password,
  });
  console.log('data', data);

  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: `${api}/LoginEmployee`,
    withCredentials: true,
    data,
  })
    .then((res) => {
      console.log('arrrrr');
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log('err');
      console.log(error);
      return error;
    });
};

function* loginEmployee(action) {
  console.log('action', action);
  const result = yield call(postLogin, action.credential);
  console.log('result', result);
  if (result.data.error) {
    console.log('result.data.error', result.data.error);
    yield put(loginEmployeeError(result.data.error));
  } else {
    yield put(clearCart());
    const stringEmployee = JSON.stringify(result.data);
    document.cookie = `employee=${stringEmployee}`;

    yield put(loginEmployeeLoaded(result));
  }
}

function* clearEmployeeReducer() {
  yield put({ type: CLEAR_EMPLOYEE_REDUCER_LOADED });
}

function* employeeSagas() {
  yield takeLatest(LOGIN_EMPLOYEE, loginEmployee);
  yield takeLatest(CLEAR_EMPLOYEE_REDUCER, clearEmployeeReducer);
}

export default employeeSagas;
