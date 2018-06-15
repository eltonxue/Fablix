export const selectSingleMovieContainer = (state) => state.containers.singleMovieReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectSingleMovieData = (state) => selectSingleMovieContainer(state).movieData;
export const selectSearchSingleMovieError = (state) =>
  selectSingleMovieContainer(state).searchSingleMovieError;
