import axios from 'axios';

export const LOAD_FRIDGE = 'LOAD_FRIDGE';
export const SELECT_FROM_FRIDGE = 'SELECT_FROM_FRIDGE';

export const loadFridge = (id) => {
  return dispatch => {
    return axios.get(`/api/fridge/${id}`)
    .then(data => {
      dispatch({
        type: LOAD_FRIDGE,
        fridge: data
      })
    })
    .catch(err => {
      console.log('err',err)
    })
  }
}

export const selectFromFridge = (name) => {
  return  {
    type: SELECT_FROM_FRIDGE,
    selected: name
  }
}
