import {REGISTER} from "../actions/UserAction";

const initialState = {
  users:[]
}

export default (state = initialState,action ={})=>{
  switch(action.type){
    case REGISTER:
    return {...state, users: action.users};
   
    default:
    return state;
  }
}