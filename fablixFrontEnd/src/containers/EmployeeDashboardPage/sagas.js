import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import { api } from '../../config';

import {
  ADD_STAR,
  ADD_STAR_LOADED,
  ADD_MOVIE,
  ADD_MOVIE_LOADED,
  CLEAR_DASHBOARD_REDUCER,
  CLEAR_DASHBOARD_REDUCER_LOADED,
} from './constants';

const postAddStar = (starData) => {
  console.log(`${api}`);

  const data = queryString.stringify({
    starId: starData.starId,
    fullName: starData.fullName,
    birthYear: starData.birthYear,
  });
  console.log('data', data);

  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: `${api}/AddStar`,
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

const postAddMovie = (movieData) => {
  console.log(`${api}`);

  const data = queryString.stringify({
    movieId: movieData.movieId,
    title: movieData.title,
    director: movieData.director,
    year: movieData.year,
    starId: movieData.starId,
    star: movieData.star,
    genre: movieData.genre,
  });
  console.log('data', data);

  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: `${api}/AddMovie`,
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

function* addStar(action) {
  console.log('action', action);
  const result = yield call(postAddStar, action.data);
  console.log('result', result);
  if (result.data.error) {
    console.log('result.data.error', result.data.error);
    yield put({ type: ADD_STAR_LOADED, error: result.data.error });
  } else {
    yield put({ type: ADD_STAR_LOADED, success: result });
  }
}

function* addMovie(action) {
  console.log('action', action);
  const result = yield call(postAddMovie, action.data);
  console.log('result', result);
  if (result.data.error) {
    console.log('result.data.error', result.data.error);
    yield put({ type: ADD_MOVIE_LOADED, error: result.data.error });
  } else {
    yield put({ type: ADD_MOVIE_LOADED, success: result });
  }
}

function* clearDashboardReducer() {
  yield put({ type: CLEAR_DASHBOARD_REDUCER_LOADED });
}

function* dashboardSagas() {
  yield takeLatest(ADD_STAR, addStar);
  yield takeLatest(ADD_MOVIE, addMovie);
  yield takeLatest(CLEAR_DASHBOARD_REDUCER, clearDashboardReducer);
}

export default dashboardSagas;
