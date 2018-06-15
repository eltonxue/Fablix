export const selectEmployeeContainer = (state) => state.containers.employeeReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectEmployeeData = (state) => selectEmployeeContainer(state).employeeData;
export const selectEmployeeLoginError = (state) =>
  selectEmployeeContainer(state).employeeLoginError;
