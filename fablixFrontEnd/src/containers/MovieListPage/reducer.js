import {
  SEARCH_MOVIES,
  SEARCH_MOVIES_LOADED,
  SEARCH_MOVIES_ERROR,
  FULL_TEXT_SEARCH_MOVIES,
  FULL_TEXT_SEARCH_MOVIES_LOADED,
  FULL_TEXT_SEARCH_MOVIES_ERROR,
  SORT_TITLE_ASCENDING,
  SORT_TITLE_DESCENDING,
  SORT_YEAR_ASCENDING,
  SORT_YEAR_DESCENDING,
  EMPTY_MOVIE_DATA,
} from './constants';

const initialState = {
  storedQueryMovie: {},
  storedQueryStars: {},
  moviesData: null,
  starsData: null,
  searchMoviesLoading: null,
  searchMoviesLoaded: null,
  searchMoviesError: null,
};

const appReducer = (state = initialState, action) => {
  console.log('movie reducer change:', state);
  console.log('movie reducer', action)
  switch (action.type) {
    case SEARCH_MOVIES:
      return {
        ...state,
        searchMoviesLoading: true,
        searchMoviesError: null,
      };
    case SEARCH_MOVIES_LOADED:
      return {
        ...state,
        moviesData: action.data,
        searchMoviesLoading: false,
        searchMoviesLoaded: true,
        searchMoviesError: null,
      };
    case SEARCH_MOVIES_ERROR:
      return {
        ...state,
        searchMoviesLoading: false,
        searchMoviesLoaded: false,
        searchMoviesError: action.error,
      };
    case FULL_TEXT_SEARCH_MOVIES:
      return {
        ...state,
        searchMoviesLoading: true,
        searchMoviesError: null,
      };
    case FULL_TEXT_SEARCH_MOVIES_LOADED:
      if (action.data.type === 'movie') {
        return {
          ...state,
          storedQueryMovie: { ...state.storedQueryMovie, [action.data.query]: action.data.result },
          moviesData: action.data.result,
          searchMoviesLoading: false,
          searchMoviesLoaded: true,
          searchMoviesError: null,
        };
      }
      return {
        ...state,
        storedQueryStars: { ...state.storedQueryStars, [action.data.query]: action.data.result },
        starsData: action.data.result,
        searchMoviesLoading: false,
        searchMoviesLoaded: true,
        searchMoviesError: null,
      };
    case FULL_TEXT_SEARCH_MOVIES_ERROR:
      return {
        ...state,
        searchMoviesLoading: false,
        searchMoviesLoaded: false,
        searchMoviesError: action.error,
      };
    case EMPTY_MOVIE_DATA:
      return {
        ...state,
        moviesData: null,
        storedQueryMovie: {},
        storedQueryStars: {},
      };
    case SORT_TITLE_ASCENDING: {
      const allMovies = { ...state.moviesData };
      allMovies.data.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
      return { ...state, moviesData: allMovies };
    }

    case SORT_TITLE_DESCENDING: {
      const allMovies = { ...state.moviesData };
      allMovies.data.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
      return { ...state, moviesData: allMovies };
    }

    case SORT_YEAR_ASCENDING: {
      const allMovies = { ...state.moviesData };
      allMovies.data.sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));
      return { ...state, moviesData: allMovies };
    }

    case SORT_YEAR_DESCENDING: {
      const allMovies = { ...state.moviesData };
      allMovies.data.sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));
      return { ...state, moviesData: allMovies };
    }
    case 'persist/REHYDRATE':
      {
        if (!action.err && action.key === 'root') {
          console.log('old action', action)
          action.payload.containers.moviesReducer = state;
          console.log('new action', action)
          return state;
        }
      }
    default:
      return state;
  }
};

export default appReducer;
