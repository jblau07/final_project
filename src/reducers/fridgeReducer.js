import { LOAD_FRIDGE, SELECT_FROM_FRIDGE, DESELECT_FROM_FRIDGE, CLEAR_SELECTED } from '../actions/FridgeAction';

const initialState = {
  fridge: [],
  selected: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FRIDGE:
      return {...state, fridge: action.fridge};
    case CLEAR_SELECTED: {
      return {...state, selected: []}
    }
    case SELECT_FROM_FRIDGE:
      const updatedSelect = state.selected.concat(action.selected)
      return {...state, selected: updatedSelect}
    case DESELECT_FROM_FRIDGE:
      let itemToRemove = state.selected.indexOf(action.selected)
      if (itemToRemove === -1) {
        return {...state}
      } else {
        state.selected.splice(itemToRemove, 1)
        return {...state}
      }
    default:
      return state;
  }
};