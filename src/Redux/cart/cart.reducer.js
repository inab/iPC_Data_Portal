import CartActionTypes from './cart.types';
import { addItemToCart } from './cart.utils';

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
        cartWhitelist: state.cartWhitelist.filter((el) => el.file_ID !== action.payload._id),
        cartBlacklist: state.cartBlacklist.filter((el) => el.file_ID !== action.payload._id)
      };
    default:
      return state;
  }
};

export default cartReducer;