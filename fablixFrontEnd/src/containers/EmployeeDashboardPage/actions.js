import { ADD_STAR, ADD_MOVIE, CLEAR_DASHBOARD_REDUCER } from './constants';

export const addStar = (starData) => ({
  type: ADD_STAR,
  data: starData,
});

export const addMovie = (movieData) => ({
  type: ADD_MOVIE,
  data: movieData,
});

export const clearDashboardReducer = () => ({
  type: CLEAR_DASHBOARD_REDUCER,
});
