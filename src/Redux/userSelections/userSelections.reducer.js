import userSelectionsTypes from './userSelections.types';

const INITIAL_STATE = {
  userSelections: [],
  //isFetching: false,
  //errorMessage: undefined
};

const userSelectionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /*case userSelectionsTypes.FETCH_USERSELECTIONS_BEGIN:
        return {
            ...state,
            isFetching: true
        };*/
    case userSelectionsTypes.FETCH_USERSELECTIONS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            selections: action.payload   
        };
    case userSelectionsTypes.UPDATE_USERSELECTIONS:
        return {
            ...state,
            selections: action.payload   
        };
    /*case userSelectionsTypes.FETCH_USERSELECTIONS_FAILURE:
        return {
            ...state,
            isFetching: false,
            errorMessage: action.payload          
        };*/
    default:
      return state;
  }
};

export default userSelectionsReducer;