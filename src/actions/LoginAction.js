import axios from "axios";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loginAction = user => {
  return dispatch => {
    return axios
      .post("/api/login", {
        username: user.username,
        password: user.password
      })
      .then(loginInfo => {
        console.log(loginInfo);
        localStorage.setItem("id", loginInfo.data.id);
        const loggedInUser = {
          username: loginInfo.data.username,
          id: loginInfo.data.id
        };
        dispatch({
          type: LOGIN,
          payload: loggedInUser
        });
      })
      .catch(err => {
        console.log({ err: err.message });
      });
  };
};

export const logout = () => {
  return dispatch => {
    return fetch(`api/logout`)
      .then(logout => {
        dispatch({
          type: LOGOUT,
          payload: logout
        });
      })
      .catch(err => {
        console.log({ err: err.message });
      });
  };
};
