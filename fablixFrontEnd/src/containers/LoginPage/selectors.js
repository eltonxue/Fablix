export const selectUserContainer = (state) => state.containers.userReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectUserData = (state) => selectUserContainer(state).userData;
export const selectUserLoginError = (state) => selectUserContainer(state).userLoginError;
