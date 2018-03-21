import { SEND_IMAGE } from '../actions/ImageCaptureAction';

const initialState = {
  results: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_IMAGE:
      return { ...state, results: action.results };
    default:
      return state;
  }
}