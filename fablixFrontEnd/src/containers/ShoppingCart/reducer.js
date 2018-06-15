
// const data = {
//   movie: movieData,
//   count: 1
// }

import {
  UPDATE_CART,
  UPDATE_CART_ERROR,
  CLEAR_CART,
  ADD_ONE_CART,
  DELETE_CART_ITEM,
  BUY_CART,
  BUY_CART_ERROR,
  BUY_CART_SUCCESS,
} from './constants';

const initialState = {
  shoppingCartData: [],
  shoppingCartError: null,
  buyCartData: null,
  buyCartError: null,
  buyCartLoading: false,
  buyCartLoaded: false,
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CART: {
      const initState = { ...initialState };
      return initState;
    }
    case UPDATE_CART: {
      const movieData = action.data;
      const currentCart = [...state.shoppingCartData];

      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].movie.id === movieData.movie.id) {
          currentCart[i].count = movieData.count;
          return {
            ...state,
            shoppingCartData: currentCart,
            shoppingCartError: null,
          };
        }
      }
      currentCart.push({
        movie: movieData.movie,
        count: movieData.count
      });
      return {
        ...state,
        shoppingCartData: currentCart,
        shoppingCartError: null,
      };
    }
    case ADD_ONE_CART: {
      const movieData = action.data;
      const currentCart = [...state.shoppingCartData];

      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].movie.id === movieData.movie.id) {
          currentCart[i].count += 1;
          return {
            ...state,
            shoppingCartData: currentCart,
            shoppingCartError: null,
          };
        }
      }
      currentCart.push({
        movie: movieData.movie,
        count: 1
      });
      return {
        ...state,
        shoppingCartData: currentCart,
        shoppingCartError: null,
      };
    }
    case DELETE_CART_ITEM: {
      const movieData = action.data;
      // const currentCart = [...state.shoppingCartData];

      const currentCart = state.shoppingCartData.filter((current) => {
        return current.movie.id !== movieData.movie.id;
      });
      return {
        ...state,
        shoppingCartData: currentCart,
        shoppingCartError: null,
      };
    }
    case UPDATE_CART_ERROR:
      return {
        ...state,
        shoppingCartError: action.error
      };
    case BUY_CART:
      return {
        ...state,
        buyCartLoading: true,
        buyCartError: null,
      };
    case BUY_CART_SUCCESS:
      return {
        ...state,
        buyCartData: action.data,
        buyCartLoading: false,
        buyCartLoaded: true,
        buyCartError: null,
      };
    case BUY_CART_ERROR:
      console.log('aaaaa', action);
      return {
        ...state,
        buyCartData: null,
        buyCartLoading: false,
        buyCartLoaded: false,
        buyCartError: action.error,
      };
    default:
      return state;
  }
};

export default shoppingCartReducer;
