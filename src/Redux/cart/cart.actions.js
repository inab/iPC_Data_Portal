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
    const { REACT_APP_PERMISSIONS_URL } = process.env;
    axios({
      method: 'get',
      url: `${REACT_APP_PERMISSIONS_URL}/me/permissions?format=PLAIN`, 
      headers: {
        Authorization: "Bearer " + access_token
      }
    }).then(response => {
      let allowedIds;
      let allowedItems;
      let restrictedItems;

      if(response.data.length > 0){
        allowedIds = response.data.map(visa => JSON.parse(visa).ga4gh_visa_v1.value)
        allowedItems = list.filter((item) => allowedIds.includes(item["file_ID"]) || item["access"] == "public");
        restrictedItems = list.filter((item) => !allowedIds.includes(item["file_ID"]) && item["access"] != "public");
	console.log(allowedItems)
        allowedItems = allowedItems.reduce((a, b) => a.concat(b), []);
      } else {
        allowedItems = list.filter((item) => item["access"] == 'public');
        restrictedItems = list.filter((item) => item["access"] != 'public');
      }

      dispatch(addItemToWhitelist(allowedItems));
      dispatch(addItemToBlacklist(restrictedItems));

    })
    .catch(error => {
      throw error;
    }); 
  }
};
