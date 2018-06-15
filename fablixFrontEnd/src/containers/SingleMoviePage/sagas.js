import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import { searchSingleMovieLoaded, searchSingleMovieError } from './actions';
import { api } from '../../config';

import { SEARCH_SINGLE_MOVIE } from './constants';

const getSingleMovie = (searchTerms) => {
  // searchTerms = {obj}

  let URL = `${api}/Search?`;

  const data = queryString.stringify(searchTerms);

  URL += data;

  return axios.get(URL);
};

function* searchSingleMovie(action) {
  const result = yield call(getSingleMovie, action.payload);
  if (result.data.error) {
    yield put(searchSingleMovieError(result.data.error));
  } else {
    yield put(searchSingleMovieLoaded(result));
  }
}

function* singleMovieSagas() {
  yield takeLatest(SEARCH_SINGLE_MOVIE, searchSingleMovie);
}

export default singleMovieSagas;
