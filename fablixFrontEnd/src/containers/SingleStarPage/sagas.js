import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import { searchSingleStarLoaded, searchSingleStarError } from './actions';
import { api } from '../../config';

import { SEARCH_SINGLE_STAR } from './constants';

const getSingleStar = (searchTerms) => {
  // searchTerms = {obj}

  let URL = `${api}/SearchSingleStar?`;


  const data = queryString.stringify(searchTerms);

  URL += data;

  return axios.get(URL);
};

const getSingleStarMovies = (searchTerms) => {
  let URL = `${api}/Search?`;

  const data = queryString.stringify(searchTerms);

  URL += data;

  return axios.get(URL);
};

function* searchSingleStar(action) {
  const result = yield call(getSingleStar, action.payload);
  const movies = yield call(getSingleStarMovies, action.payload);
  result.movies = movies.data;
  if (result.data.error) {
    yield put(searchSingleStarError(result.data.error));
  } else {
    yield put(searchSingleStarLoaded(result));
  }
}

function* singleStarSagas() {
  yield takeLatest(SEARCH_SINGLE_STAR, searchSingleStar);
}

export default singleStarSagas;
