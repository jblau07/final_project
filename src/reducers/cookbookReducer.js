import { POST_SAVED_RECIPES } from '../actions/ItemsAction';

const initialState = {
  cookbook: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_SAVED_RECIPES:
      return { ...state, cookbook: action.payload }
    default:
      return state;
  }
}