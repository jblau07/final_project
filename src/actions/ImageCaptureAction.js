import axios from 'axios';

export const SEND_IMAGE = 'SEND_IMAGE';
export const SEND_INGREDIENT = 'SEND_INGREDIENT';
export const CLEAR_IMAGE_RESULTS = 'CLEAR_IMAGE_RESULTS';

export const sendImage = (image) => {
  return dispatch => {
    return axios.post('/api/image-capture', {
      image: image
    })
    .then(data => {
      console.log('data', data);
      dispatch({
        type: SEND_IMAGE,
        results: data.data.results
      });
    })
    .catch(err => {
      console.log('err', err);
    });
  }
}

export const sendIngredient = (ingredient, cb) => {
  let user_id;
  if (localStorage.length > 0) {
    user_id = localStorage.getItem('id');
  }
  return dispatch => {
    return axios.post('/api/ingredients', {
      name: ingredient
    })
    .then(ingredient => {
      console.log('ingredient', ingredient);
      let newFridgeItem = ingredient.data.id;
      return axios.post('/api/fridge', {
        user_id,
        newFridgeItem
      })
      .then(data => {
        console.log('data', data);
        cb();
      })
      .catch(err => {
        console.log('err', err);
      });
    })
    .catch(err => {
      console.log('err', err);
    });
  }
}

export const clearImageResults = () => {
  return {
    type: CLEAR_IMAGE_RESULTS
  };
};