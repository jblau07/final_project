import axios from "axios";

const EDAMAM = "https://developer.edamam.com/edamam-docs-recipe-api";

export const LOAD_RECIPES = "LOAD_RECIPES";
export const SET_ACTIVE_RECIPES = "SET_ACTIVE_RECIPES";
export const POST_SAVED_RECIPES = "POST_SAVED_RECIPES";
export const CLEAR_RECIPES = "CLEAR_RECIPES";

export const loadRecipes = (Ingredients, redirectCallback) => {
  let user_id;
  if (localStorage.length > 0) {
    user_id = localStorage.getItem('id');
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
        redirectCallback()
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
  if (localStorage.length > 0) {
    user_id = localStorage.getItem('id');
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

export const clearRecipes = () => {
 return dispatch=> {

   dispatch({
      type:CLEAR_RECIPES
    })
 }
}