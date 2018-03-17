import { combineReducers } from "redux";
import barcodeReducer from "./barcodeReducer";
import recipesReducer from "./recipesReducer";
import suggestReducer from "./suggestReducer";
import fridgeReducer from "./fridgeReducer";


export default combineReducers({
  barcodeScanner: barcodeReducer,
  recipes: recipesReducer,
  suggest: suggestReducer,
  fridge: fridgeReducer
});
