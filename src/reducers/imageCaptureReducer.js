import { SEND_IMAGE, SEND_INGREDIENT, CLEAR_IMAGE_RESULTS } from '../actions/ImageCaptureAction';

const initialState = {
  results: [],
  ingredient: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_IMAGE:
      return { ...state, results: action.results };
    case SEND_INGREDIENT:
      return { ...state, ingredient: action.ingredient };
    case CLEAR_IMAGE_RESULTS:
      return {...state, results: []}
    default:
      return state;
  }
}