import userSelectionsTypes from './userSelections.types';
import { getDatasetsLocators, getDatasetsMetadata, generateSelectionsStore } from '../../Services/ManageMetadata';

/*
export const fetchUserSelectionsBegin = () => ({
  type: userSelectionsTypes.FETCH_USERSELECTIONS_BEGIN
});*/

/*
export const fetchUserSelectionsFailure = errorMessage => ({
  type: userSelectionsTypes.FETCH_USERSELECTIONS_FAILURE,
  payload: errorMessage
});*/

export const fetchUserSelectionsSuccess = selections => ({
  type: userSelectionsTypes.FETCH_USERSELECTIONS_SUCCESS,
  payload: selections
});

export const fetchUserSelections = () => {
  return async dispatch => {
    //dispatch(fetchUserSelectionsBegin());
    const datasetsLocators = await getDatasetsLocators();
    const datasetsMetadata = await getDatasetsMetadata(datasetsLocators);
    const selectionsStore = generateSelectionsStore(datasetsMetadata); 
    dispatch(fetchUserSelectionsSuccess(selectionsStore));
    //dispatch(fetchUserSelectionsSuccess([selectionsStore[0]], [selectionsStore[1]]));
  }
}/*.catch(error => dispatch(fetchUserSelectionsFailure(error.message)));   */

export const updateUserSelections = selections => ({
  type: userSelectionsTypes.UPDATE_USERSELECTIONS,
  payload: selections
})