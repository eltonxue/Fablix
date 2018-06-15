import {
  SEARCH_SINGLE_MOVIE,
  SEARCH_SINGLE_MOVIE_LOADED,
  SEARCH_SINGLE_MOVIE_ERROR,
} from './constants';

const initialState = {
  movieData: { data: [{ star: [], genre: [] }] },
  searchSingleMovieLoading: null,
  searchSingleMovieLoaded: null,
  searchSingleMovieError: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SINGLE_MOVIE:
      return {
        ...state,
        searchSingleMovieLoading: true,
        searchSingleMovieError: null,
      };
    case SEARCH_SINGLE_MOVIE_LOADED:
      return {
        ...state,
        movieData: action.data,
        searchSingleMovieLoading: false,
        searchSingleMovieLoaded: true,
        searchSingleMovieError: null,
      };
    case SEARCH_SINGLE_MOVIE_ERROR:
      return {
        ...state,
        searchSingleMovieLoading: false,
        searchSingleMovieLoaded: false,
        searchSingleMovieError: action.error,
      };

    default:
      return state;
  }
};

export default appReducer;
