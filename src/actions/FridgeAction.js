import axios from "axios";

export const LOAD_FRIDGE = "LOAD_FRIDGE";
export const SELECT_FROM_FRIDGE = "SELECT_FROM_FRIDGE";
export const DESELECT_FROM_FRIDGE = "DESELECT_FROM_FRIDGE";
export const CLEAR_SELECTED = "CLEAR_SELECTED";

export const loadFridge = () => {
    let user_id;
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (userInfo) {
      user_id = userInfo.id;
    }
    return dispatch => {
      return axios.get(`/api/fridge/${user_id}`)
        .then(data => {
          return dispatch({
            type: LOAD_FRIDGE,
            fridge: data.data
          });
        })
        .catch(err => {
          console.log("err", err);
        });
      }
    };

    export const deleteFromFridge = id => {
      let user_id;
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (userInfo) {
      user_id = userInfo.id;
    }
      return dispatch => {
        return axios
          .delete(`/api/fridge/${user_id}/${id}`)
          .then(() => {
            return axios.get(`/api/fridge/${user_id}`).then(data => {
              dispatch({
                type: LOAD_FRIDGE,
                fridge: data.data
              });
            });
          })
          .catch(err => {
            console.log(err);
          });
      };
    };

    export const deselectFromFridge = name => {
      console.log("deselect", name);
      return {
        type: DESELECT_FROM_FRIDGE,
        selected: name
      };
    };

    export const clearAllSelected = () => {
      return {
        type: CLEAR_SELECTED
      };
    };

    export const selectFromFridge = name => {
      console.log("select", name);
      return {
        type: SELECT_FROM_FRIDGE,
        selected: name
      };
    };
  