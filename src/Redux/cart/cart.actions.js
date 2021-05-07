import CartActionTypes from './cart.types';
import axios from 'axios';

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

export const addItem = (list) => {
  return dispatch => {
    const access_token = localStorage.getItem("react-token");
    // First we check all user permissions.
    axios({
      method: 'get',
      url: "https://dev-catalogue.ipc-project.bsc.es/permissions/api/user/documents",
      headers: {
        Authorization: "Bearer " + access_token
      }
    }).then(response => {

      let allowedIds = response.data[0].permissions.map(item => item.fileId);

      let allowedItems = list.filter((item) => allowedIds.includes(item["file_ID"]) || item["access"] == "public");

      let restrictedItems = list.filter((item) => !allowedIds.includes(item["file_ID"]) && item["access"] != "public");

      allowedItems = allowedItems.reduce((a, b) => a.concat(b), []);
      
      dispatch(addItemToWhitelist(allowedItems));
      dispatch(addItemToBlacklist(restrictedItems));

    })
    .catch(error => {
      throw error;
    }); 
  }
};
