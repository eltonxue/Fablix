export const selectShoppingCartContainer = (state) => state.containers.shoppingCartReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectShoppingCartData = (state) => selectShoppingCartContainer(state).shoppingCartData;
export const selectShoppingCartError = (state) => selectShoppingCartContainer(state).shoppingCartError;

export const selectBuyCartData = (state) => selectShoppingCartContainer(state).buyCartData;
export const selectBuyCartError = (state) => selectShoppingCartContainer(state).buyCartError;
