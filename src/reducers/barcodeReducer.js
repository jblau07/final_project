import { UPC_INGREDIENT } from "../actions/BarcodeAction";

const initialState = {
  ingredient: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPC_INGREDIENT:
      return { ...state, ingredient: action.ingredient };
    default:
      return state;
  }
};
