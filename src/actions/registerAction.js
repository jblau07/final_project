import axios from 'axios';

export const REGISTER = "REGISTER";

export const register = (user) => {

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
    })
    .catch(err => {
      console.log({ err: err.message });
    })
  }
}