import {
  SEARCH_SINGLE_STAR,
  SEARCH_SINGLE_STAR_LOADED,
  SEARCH_SINGLE_STAR_ERROR,
} from './constants';

const initialState = {
  starData: { data: {}, movies: [] },
  searchSingleStarLoading: null,
  searchSingleStarLoaded: null,
  searchSingleStarError: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SINGLE_STAR:
      return {
        ...state,
        searchSingleStarLoading: true,
        searchSingleStarError: null,
      };
    case SEARCH_SINGLE_STAR_LOADED:
      return {
        ...state,
        starData: action.data,
        searchSingleStarLoading: false,
        searchSingleStarLoaded: true,
        searchSingleStarError: null,
      };
    case SEARCH_SINGLE_STAR_ERROR:
      return {
        ...state,
        searchSingleStarLoading: false,
        searchSingleStarLoaded: false,
        searchSingleStarError: action.error,
      };

    default:
      return state;
  }
};

export default appReducer;
