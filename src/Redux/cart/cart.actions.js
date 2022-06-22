import CartActionTypes from './cart.types';
import { getUserDatasetPermissions, generateCartStore } from '../../Services/ManagePermissions';

export const addItemToWhitelist = item => ({
  type: CartActionTypes.ADD_ITEM_TO_WHITELIST,
  payload: item
});

export const addItemToBlacklist = item => ({
  type: CartActionTypes.ADD_ITEM_TO_BLACKLIST,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const addItem = (datasetList) => {
  return async (dispatch) => {
      const userDatasetPermissions = await getUserDatasetPermissions();
      const cartStore = generateCartStore(datasetList, userDatasetPermissions);
      dispatch(addItemToWhitelist(cartStore[0]));
      dispatch(addItemToBlacklist(cartStore[1]));
  }
};
