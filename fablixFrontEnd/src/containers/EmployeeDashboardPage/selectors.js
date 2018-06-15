export const selectDashboardContainer = (state) => state.containers.dashboardReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectDashboardData = (state) => selectDashboardContainer(state).dashboardData;
export const selectDashboardError = (state) => selectDashboardContainer(state).dashboardError;
