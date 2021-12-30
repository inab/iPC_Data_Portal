import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import cartReducer from './cart/cart.reducer';
import userSelectionsReducer from './userSelections/userSelections.reducer';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  cart: cartReducer,
  selections: userSelectionsReducer
});

export default persistReducer(persistConfig, rootReducer);
