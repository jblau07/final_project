import { combineReducers } from "redux";
import barcodeReducer from "./barcodeReducer";
import recipesReducer from "./recipesReducer";
import suggestReducer from "./suggestReducer";
import userReducer from './userReducer';
import fridgeReducer from "./fridgeReducer";


export default combineReducers({
  barcodeScanner: barcodeReducer,
  recipes: recipesReducer,
  suggest: suggestReducer,
  users:userReducer,
  fridge: fridgeReducer
});
