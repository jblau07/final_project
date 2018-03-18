import { REGISTER } from "../actions/UserAction";
import { LOGIN } from "../actions/LoginAction";
import { LOGOUT } from "../actions/LoginAction";

const initialState = {
  users: [],
  user: []

}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, users: action.payload }
    case LOGIN:
      localStorage.setItem('id', action.payload.data.id);
      return { ...state, user: action.payload }
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null }

    default:
      return state;
  }
}