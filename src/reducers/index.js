import { combineReducers } from "redux";
import barcodeReducer from "./barcodeReducer";
import recipesReducer from "./recipesReducer";

export default combineReducers({
  barcodeScanner: barcodeReducer,
  recipes: recipesReducer
});
