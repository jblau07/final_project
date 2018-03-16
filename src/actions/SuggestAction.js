import axios from 'axios';

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const loadIngredients = () => {
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

export const addIngredient = (newIngredient) => {
  console.log('adding')
  return dispatch => {
    return axios.post('/api/ingredients', {
      name: newIngredient
    })
    .then(ingredient => {
      dispatch({
        type: ADD_INGREDIENT,
        singleIngredient: ingredient.data
      })
    
    })
    .catch((err) => {
      console.log(err)
    })
  }
}