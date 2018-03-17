import { combineReducers } from "redux";
import recipesReducer from "./recipesReducer";
import suggestReducer from "./suggestReducer";
import fridgeReducer from "./fridgeReducer";


export default combineReducers({
  recipes: recipesReducer,
  suggest: suggestReducer,
  fridge: fridgeReducer
});
