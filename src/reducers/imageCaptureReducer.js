import { SEND_IMAGE } from '../actions/ImageCaptureAction';

const initialState = {

};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_IMAGE:
      return { ...state, image: action.image };

    default:
      return state;
  }
}