import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import { buyCart, buyCartError, buyCartSuccess, clearCart } from './actions';
import { api } from '../../config';

import {
  BUY_CART,
  BUY_CART_SUCCESS,
  BUY_CART_ERROR,
} from './constants';

/*
  Data downloading using pure JS fetch
  @type: JS object
  { result: resultObj, error: errorObj }
*/
const postSale = (saleInfo) => {
  console.log('jsdfs', saleInfo);
  console.log(`${api}`);

  const data = queryString.stringify({
    firstName: saleInfo.firstName,
    lastName: saleInfo.lastName,
    cardNum: saleInfo.cardNum,
    cardExp: saleInfo.cardExp,
    saleData: saleInfo.saleData,
    userId: saleInfo.userId
  });
  console.log('data',data);

  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: `${api}/Sale`,
    data
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

function* makeSale(action) {
  const result = yield call(postSale, action.data);
  if (result.data.error) {
    yield put(buyCartError(result.data.error));
  }
  else {
    yield put(clearCart());
    yield put(buyCartSuccess(result));
  }
}

function* cartSagas() {
  yield takeLatest(BUY_CART, makeSale);
}

export default cartSagas;
