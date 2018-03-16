import { combineReducers } from "redux";
import recipesReducer from "./recipesReducer";
import suggestReducer from "./suggestReducer";

export default combineReducers({
  recipes: recipesReducer,
  suggest: suggestReducer

});
