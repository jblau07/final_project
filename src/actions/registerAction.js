import axios from 'axios';

export const REGISTER = "REGISTER";

export const register = (user, redirectCallback) => {

  return dispatch => {
    return axios.post('/api/register',{
      username:user.username,
      password:user.password
    })
    .then(newUser => {
      dispatch({
        type:REGISTER,
        users:newUser
      })
      redirectCallback();
    })
    .catch(err => {
      console.log({ err: err.message });
    })
  }
}