// import { fromJS } from 'immutable';

import { ADD_STAR_LOADED, ADD_MOVIE_LOADED, CLEAR_DASHBOARD_REDUCER_LOADED } from './constants';

const initialState = {
  dashboardData: null,
  dashboardLoading: null,
  dashboardLoaded: null,
  dashboardError: null,
  addStarMessageError: '',
  addStarMessageSuccess: '',
  addMovieMessageError: '',
  addMovieMessageSuccess: '',
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STAR_LOADED: {
      console.log('printing out');
      console.log(action);
      if (action.error) {
        return {
          ...state,
          dashboardLoading: true,
          dashboardError: null,
          addStarMessageError: action.error,
          addStarMessageSuccess: '',
        };
      }
      return {
        ...state,
        dashboardLoading: true,
        dashboardError: null,
        addStarMessageError: '',
        addStarMessageSuccess: action.success.data.message,
      };
    }

    case ADD_MOVIE_LOADED: {
      if (action.error) {
        return {
          ...state,
          dashboardLoading: true,
          dashboardError: null,
          addMovieMessageError: action.error,
          addMovieMessageSuccess: '',
        };
      }
      return {
        ...state,
        dashboardLoading: true,
        dashboardError: null,
        addMovieMessageError: '',
        addMovieMessageSuccess: action.success.data.message,
      };
    }
    case CLEAR_DASHBOARD_REDUCER_LOADED:
      console.log('cleared dashboard reducer');
      return {
        dashboardData: null,
        dashboardLoading: false,
        dashboardLoaded: false,
        dashboardError: null,
        addStarMessageError: '',
        addStarMessageSuccess: '',
        addMovieMessageError: '',
        addMovieMessageSuccess: '',
      };
    default:
      return state;
  }
};

export default dashboardReducer;
