import axios from 'axios';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";


export const loginAction = (user) => {
  return dispatch => {
    return axios.post('/api/login',{
      username:user.username,
      password:user.password
    })
    .then(loginInfo => {
      dispatch({
        type:LOGIN,
        payload:loginInfo
      })
    })
    .catch( err => {
      console.log({err:err.message})
    })
  }
}

export const logout = () => {
  return dispatch => {
    return fetch(`api/logout`)
      .then(logout => {
        dispatch({
          type:LOGOUT,
          payload:logout
        })
      })
      .catch(err=>{
        console.log({err:err.message})
      })
  }
}