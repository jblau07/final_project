import axios from 'axios';

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_TO_FRIDGE = 'ADD_TO_FRIDGE';


export const loadIngredients = () => {
  return dispatch => {
    return axios.get('/api/ingredients')
      .then(data => {
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
  let user_id;
  if (localStorage.length > 0) {
    user_id = localStorage.getItem('id');
  }

  return dispatch => {
    return axios.post('/api/ingredients', {
      name: newIngredient
    })
      .then(ingredient => {
        let newFridgeItem = ingredient.data.id
        return axios.post('/api/fridge', {
          user_id,
          newFridgeItem
        })
          .then(data => {
            return axios.get(`/api/fridge/${user_id}`)
              .then(data => {
                dispatch({
                  type: 'LOAD_FRIDGE',
                  fridge: data
                })
              })
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
