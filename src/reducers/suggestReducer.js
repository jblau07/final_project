import { LOAD_INGREDIENTS } from "../actions/SuggestAction";

const initialState = {
  ingredients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INGREDIENTS:
      return { ...state, ingredients: action.ingredients };
    default:
      return state;
  }
};
