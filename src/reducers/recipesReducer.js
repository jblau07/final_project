import { LOAD_RECIPES, SET_ACTIVE_RECIPES } from "../actions/ItemsAction";

const initialState = {
  recipes: [],
  activeRecipe: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECIPES:
      return { ...state, recipes: action.recipes };
    case SET_ACTIVE_RECIPES:
      return { ...state, activeRecipe: { ...action.recipe } };
    default:
      return state;
  }
};
