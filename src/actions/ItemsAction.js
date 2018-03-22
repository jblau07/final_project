import axios from "axios";

const EDAMAM = "https://developer.edamam.com/edamam-docs-recipe-api";

export const LOAD_RECIPES = "LOAD_RECIPES";
export const SET_ACTIVE_RECIPES = "SET_ACTIVE_RECIPES";
export const POST_SAVED_RECIPES = "POST_SAVED_RECIPES";

export const loadRecipes = (Ingredients) => {
  let user_id;
  const userInfo = JSON.parse(localStorage.getItem('user'));

  if (userInfo) {
    user_id = userInfo.id;
  }
  
  return dispatch => {
    return axios.post(`/api/recipes/getRecipes`,{
      Ingredients
    })
      .then(res => {
        res = res.data.recipes;
        return res;
      })
      .then(recipes => {
        dispatch({
          type: LOAD_RECIPES,
          payload:recipes
        });
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: LOAD_RECIPES,
          recipes: []
        });
      });
  };
};

export const postSavedRecipes = (recipes) => {
  let user_id;
  const userInfo = JSON.parse(localStorage.getItem('user'));

  if (userInfo) {
    user_id = userInfo.id;
  }
  console.log('ARE YOU CORRECT',recipes)
  return dispatch => {
    return axios.post(`/api/recipes`,{
      recipes
    })
    .then(recipe => {
      console.log('recipe console',recipe)
      return axios.post(`/api/cookbook`, {
        user_id:user_id,
        recipe_id:recipe.data.id
      })
      .then ( data =>{
        return axios.get(`/api/cookbook/${user_id}`)
        .then(data => {
          dispatch({
            type:POST_SAVED_RECIPES,
            payload:data
          })
        })

      })

    })
    .catch(err =>{
      console.log({err:err.message})
    })

  }
}