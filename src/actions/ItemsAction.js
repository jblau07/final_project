import axios from "axios";

const EDAMAM = "https://developer.edamam.com/edamam-docs-recipe-api";

export const LOAD_RECIPES = "LOAD_RECIPES";
export const SET_ACTIVE_RECIPES = "SET_ACTIVE_RECIPES";

export const loadRecipes = (Ingredients) => {
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
