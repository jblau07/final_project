import axios from 'axios';

export const LOAD_FRIDGE = 'LOAD_FRIDGE';
export const SELECT_FROM_FRIDGE = 'SELECT_FROM_FRIDGE';

export const loadFridge = () => {
  let user_id;
  if (localStorage.length > 0) {
    user_id = localStorage.getItem('id');
  }
  return dispatch => {
    return axios.get(`/api/fridge/${user_id}`)
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

export const deleteFromFridge = (id) => {
  let user_id;
  if (localStorage.length > 0) {
    user_id = localStorage.getItem('id');
  }

  console.log('user_id', user_id)
  return dispatch => {
    return axios.delete(`/api/fridge/1/${id}`)
    .then(() => {
      return axios.get(`/api/fridge/${user_id}`)
        .then(data => {
          dispatch({
            type: 'LOAD_FRIDGE',
            fridge: data
          })
        })
        
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const selectFromFridge = (name) => {
  console.log('select', name)
  return  {
    type: SELECT_FROM_FRIDGE,
    selected: name
  }
}
