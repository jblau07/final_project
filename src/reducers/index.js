import { combineReducers } from "redux";
import barcodeReducer from "./barcodeReducer";
import recipesReducer from "./recipesReducer";
import suggestReducer from "./suggestReducer";
import imageCaptureReducer from "./imageCaptureReducer";
import userReducer from './userReducer';
import fridgeReducer from "./fridgeReducer";
import cookbookReducer from "./cookbookReducer";


export default combineReducers({
  barcodeScanner: barcodeReducer,
  recipes: recipesReducer,
  suggest: suggestReducer,
  users:userReducer,
  fridge: fridgeReducer,
  cookbook:cookbookReducer,
  imageCapture: imageCaptureReducer
  
});
