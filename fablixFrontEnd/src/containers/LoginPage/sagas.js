import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import { loginUserLoaded, loginUserError } from './actions';
import { clearCart } from '../ShoppingCart/actions';
import { api } from '../../config';

import { LOGIN_USER, CLEAR_USER_REDUCER, CLEAR_USER_REDUCER_LOADED } from './constants';

const postLogin = (credential) => {
  console.log('jsdfs', credential);
  console.log(`${api}`);

  const data = queryString.stringify({
    email: credential.email,
    password: credential.password,
    recaptcha: credential.recaptcha,
  });
  console.log('data', data);

  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: `${api}/Login`,
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

function* loginUser(action) {
  console.log('action', action);
  const result = yield call(postLogin, action.credential);
  console.log('result', result);
  if (result.data.error) {
    console.log('result.data.error', result.data.error);
    yield put(loginUserError(result.data.error));
  } else {
    yield put(clearCart());
    const stringUser = JSON.stringify(result.data);
    document.cookie = `user=${stringUser}`;

    yield put(loginUserLoaded(result));
  }
}

function* clearUserReducer() {
  yield put({ type: CLEAR_USER_REDUCER_LOADED });
}

function* userSagas() {
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(CLEAR_USER_REDUCER, clearUserReducer);
}

export default userSagas;
