import {
  SEARCH_SINGLE_MOVIE,
  SEARCH_SINGLE_MOVIE_LOADED,
  SEARCH_SINGLE_MOVIE_ERROR,
} from './constants';

export const searchSingleMovie = (searchTerms) => ({
  type: SEARCH_SINGLE_MOVIE,
  payload: searchTerms,
});

export const searchSingleMovieLoaded = (data) => ({
  type: SEARCH_SINGLE_MOVIE_LOADED,
  data,
});

export const searchSingleMovieError = (error) => ({
  type: SEARCH_SINGLE_MOVIE_ERROR,
  error,
});
