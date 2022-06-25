import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
  cartWhitelist: [],
  cartBlacklist: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM_TO_WHITELIST:
      return {
        ...state,
        cartWhitelist: addItemToCart(state.cartWhitelist, action.payload)
      };
      case CartActionTypes.ADD_ITEM_TO_BLACKLIST:
        return {
          ...state,
          cartBlacklist: addItemToCart(state.cartBlacklist, action.payload)
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartWhitelist: removeItemFromCart(state.cartWhitelist, action.payload),
        cartBlacklist: removeItemFromCart(state.cartBlacklist, action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;