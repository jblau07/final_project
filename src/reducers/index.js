import { combineReducers } from "redux";
import barcodeReducer from "./barcodeReducer";
import recipesReducer from "./recipesReducer";
import suggestReducer from "./suggestReducer";
import imageCaptureReducer from "./imageCaptureReducer";

export default combineReducers({
  barcodeScanner: barcodeReducer,
  recipes: recipesReducer,
  suggest: suggestReducer,
  imageCapture: imageCaptureReducer
});
