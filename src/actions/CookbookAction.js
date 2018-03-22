import axios from 'axios';

export const LOAD_COOKBOOK = 'LOAD_COOKBOOK';

export const loadMyCookbook = () => {
  let user_id;
  if (localStorage.length > 0) {
    user_id = localStorage.getItem("id");
  }
  return dispatch => {
    return axios.get(`/api/cookbook/${user_id}`)
      .then(data => {
        return dispatch({
          type: LOAD_COOKBOOK,
          myCookbook: data.data
        });
      })
      .catch(err => {
        console.log("err", err);
      });
    }
  };

  export const deleteFromCookbook = (id) => {
    let user_id;
    if (localStorage.length > 0) {
      user_id = localStorage.getItem("id");
    }
    return dispatch => {
      return axios
        .delete(`/api/cookbook/${user_id}/${id}`)
        .then(() => {
          return axios.get(`/api/cookbook/${user_id}`).then(data => {
            dispatch({
              type: LOAD_COOKBOOK,
              myCookbook: data.data
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
  };