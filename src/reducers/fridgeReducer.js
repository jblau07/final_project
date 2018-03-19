import { LOAD_FRIDGE, SELECT_FROM_FRIDGE } from '../actions/FridgeAction';

const initialState = {
  fridge: [],
  selected: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FRIDGE:
      return {...state, fridge: action.fridge};
    case SELECT_FROM_FRIDGE:
      const updatedSelect = state.selected.concat(action.selected)
      return {...state, selected: updatedSelect}
    default:
      return state;
  }
};