import axios from 'axios';

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';

export const loadIngredients = () => {
  console.log('ggggg')
  return dispatch => {
    return axios.get('/api/ingredients')
    .then(data => {
      console.log('data', data.data)
      dispatch({
        type: LOAD_INGREDIENTS,
        ingredients: data
      })
    })
    .catch(err => {
      console.log('err', err)
    })
  }
}