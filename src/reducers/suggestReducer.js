import { LOAD_INGREDIENTS, ADD_INGREDIENT } from "../actions/SuggestAction";

const initialState = {
  ingredients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INGREDIENTS:
      return { ...state, ingredients: action.ingredients };
    case ADD_INGREDIENT:
      return {...state, singleIngredient: action.singleIngredient}
    default:
      return state;
  }
};
