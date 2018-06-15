import {
  SEARCH_SINGLE_STAR,
  SEARCH_SINGLE_STAR_LOADED,
  SEARCH_SINGLE_STAR_ERROR,
} from './constants';

export const searchSingleStar = (searchTerms) => ({
  type: SEARCH_SINGLE_STAR,
  payload: searchTerms,
});

export const searchSingleStarLoaded = (data) => ({
  type: SEARCH_SINGLE_STAR_LOADED,
  data,
});

export const searchSingleStarError = (error) => ({
  type: SEARCH_SINGLE_STAR_ERROR,
  error,
});
