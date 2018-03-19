import axios from "axios";

const EDAMAM = "https://developer.edamam.com/edamam-docs-recipe-api";

export const LOAD_RECIPES = "LOAD_RECIPES";
export const SET_ACTIVE_RECIPES = "SET_ACTIVE_RECIPES";

export const setActiveRecipe = recipe => {
  if (recipe) {
    return {
      type: SET_ACTIVE_RECIPES,
      recipe
    };
  }
};

export const loadRecipes = (Ingredients) => {
  return dispatch => {
    return axios.post(`/api/recipes/getRecipes`,{
      Ingredients
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(json => {
        return json.results;
      })
      .then(recipes => {
        dispatch({
          type: LOAD_RECIPES,
          recipes
        });
        dispatch(setActiveRecipe(recipes[0]));
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
