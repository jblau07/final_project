import { LOAD_RECIPES, SET_ACTIVE_RECIPES } from "../actions/ItemsAction";

const initialState = {
  recipes: []

};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECIPES:
      return { ...state, recipes: action.payload };
    
    default:
      return state;
  }
};
