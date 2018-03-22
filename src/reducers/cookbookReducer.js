import { POST_SAVED_RECIPES } from '../actions/ItemsAction';
import { LOAD_COOKBOOK } from '../actions/CookbookAction';

const initialState = {
  cookbook: [],
  myCookbook: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_SAVED_RECIPES:
      return { ...state, cookbook: action.payload }
    case LOAD_COOKBOOK:
      return {...state, myCookbook: action.myCookbook}
    default:
      return state;
  }
}