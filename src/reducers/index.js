import { combineReducers } from "redux";
import barcodeReducer from "./barcodeReducer";
import recipesReducer from "./recipesReducer";
import suggestReducer from "./suggestReducer";
import imageCaptureReducer from "./imageCaptureReducer";
import userReducer from './userReducer';
import fridgeReducer from "./fridgeReducer";


export default combineReducers({
  barcodeScanner: barcodeReducer,
  recipes: recipesReducer,
  suggest: suggestReducer,
  imageCapture: imageCaptureReducer,
  users: userReducer,
  fridge: fridgeReducer
});
