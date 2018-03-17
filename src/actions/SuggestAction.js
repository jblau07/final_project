import axios from 'axios';

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_TO_FRIDGE = 'ADD_TO_FRIDGE';


export const loadIngredients = () => {
  return dispatch => {
    return axios.get('/api/ingredients')
    .then(data => {
      console.log('datawwwww', data.data)
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


// export const addToFridge = (newIngredient) => {
//   return dispatch => {
//     return axios.post('/api/fridge', {
//       name: newIngredient
//     })
//     .then(ingredient => {
//       dispatch({
//         type: ADD_TO_FRIDGE,
//         singleIngredient: ingredient.data
//       })
    
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   }
// }

export const addIngredient = (newIngredient) => {
  return dispatch => {
    return axios.post('/api/ingredients', {
      name: newIngredient
    })
    .then(ingredient => {
      let newFridgeItem = ingredient.data.id
      return axios.post('/api/fridge', {
        newFridgeItem
      })
      .then(data => {
        return axios.get('/api/fridge/1')
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
