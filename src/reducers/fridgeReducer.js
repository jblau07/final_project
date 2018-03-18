import { LOAD_FRIDGE } from '../actions/FridgeAction';

const initialState = {
  fridge: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FRIDGE:
      return {...state, fridge: action.fridge};
    default:
      return state;
  }
};