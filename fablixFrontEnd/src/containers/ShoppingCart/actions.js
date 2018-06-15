import {
  UPDATE_CART,
  UPDATE_CART_ERROR,
  CLEAR_CART,
  ADD_ONE_CART,
  DELETE_CART_ITEM,
  BUY_CART,
  BUY_CART_SUCCESS,
  BUY_CART_ERROR,
} from './constants';

export const updateCart = (data) => ({
  type: UPDATE_CART,
  data
});

export const addOneCart = (data) => ({
  type: ADD_ONE_CART,
  data
});

export const deleteCartItem = (data) => ({
  type: DELETE_CART_ITEM,
  data
});

export const updateCartError = (error) => ({
  type: UPDATE_CART_ERROR,
  error,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const buyCart = (data) => ({
  type: BUY_CART,
  data
});

export const buyCartError = (error) => ({
  type: BUY_CART_ERROR,
  error,
});

export const buyCartSuccess = (data) => ({
  type: BUY_CART_SUCCESS,
  data,
});
