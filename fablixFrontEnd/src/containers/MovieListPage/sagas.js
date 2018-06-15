import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import { searchMoviesLoaded, searchMoviesError, searchFullTextMoviesError, searchFullTextMoviesLoaded } from './actions';
import { api } from '../../config';

import { SEARCH_MOVIES, FULL_TEXT_SEARCH_MOVIES } from './constants';

const getMovieList = (searchTerms) => {
  // searchTerms = {obj}

  let URL = `${api}/Search?`;

  const data = queryString.stringify(searchTerms);

  URL += data;

  return axios.get(URL);
};

const getFullTextMovieList = (searchTerms) => {
  let URL = `${api}/FullTextSearch?`;

  const data = queryString.stringify(searchTerms);

  URL += data;

  return axios.get(URL);
};

function* searchMovies(action) {
  const result = yield call(getMovieList, action.payload);
  if (result.data.error) {
    yield put(searchMoviesError(result.data.error));
  } else {
    yield put(searchMoviesLoaded(result));
  }
}

function* searchFullTextMovies(action) {
  const result = yield call(getFullTextMovieList, action.payload);

  if (result.data.error) {
    yield put(searchFullTextMoviesError(result.data.error));
  } else {
    yield put(searchFullTextMoviesLoaded({
      type: action.payload.type,
      query: action.payload.rawValue.trim(),
      result,
    }));
  }
}

function* moviesSagas() {
  yield takeLatest(SEARCH_MOVIES, searchMovies);
  yield takeEvery(FULL_TEXT_SEARCH_MOVIES, searchFullTextMovies);
}

export default moviesSagas;
