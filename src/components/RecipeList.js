import React, { Component } from "react";
import FavoriteRecipe from "../containers/FavRecipeContainer";

export const RecipeList = ({ recipe }) => {
  console.log("RECIPELIST", recipe);
  let data;
  if (!recipe) {
    return <div />;
  } else {
    if (recipe < 0) {
      console.log("no recipes");
    } else {
      return (
        <ul className="userRecipes">
          {recipe.map(recipes => {
            data = {
              name: recipes.recipe,
              ingredients: recipes.ingredients.join(", "),
              url: recipes.url,
              image: recipes.image
            };
            console.log("WHAT ARE THE RECIPES", data);
            return (
              <div className="allrecipes">
                <h3>{data.name}</h3>
                <h4>{data.ingredients}</h4>
                <img href={data.url} src={data.image} />
                <a href={data.url} target="_blank">
                  Take Me To Recipe!
                </a>
                <FavoriteRecipe key={recipes.id} {...data} />
              </div>
            );
          })}
        </ul>
      );
    }
  }
};

export default RecipeList;
