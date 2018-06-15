export const selectSingleStarContainer = (state) => state.containers.singleStarReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectSingleStarData = (state) => selectSingleStarContainer(state).starData;
export const selectSearchSingleStarError = (state) =>
  selectSingleStarContainer(state).searchSingleStarError;
