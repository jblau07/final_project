import React, { Component } from "react";
import FavoriteRecipe from "../containers/FavRecipeContainer";

export const RecipeList = ({ recipe }) => {
  console.log("RECIPELIST", recipe);
  let data;
  if (!recipe) {
    console.log("1no recipes");

    return <div />;
  } else {
    if (recipe < 1) {
      console.log("2no recipes");
      recipe = [{
        recipe: 'Grilled Cheese',
        ingredients: '2 slices bread, 1 slice American cheese, 1 tablespoon mayonnaise',
        url: 'http://www.geniuskitchen.com/recipe/grilled-cheese-diner-style-108522',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSaIWxnatKYCVTkcGXxoSSJmtKOS06HT0w-PdBO20gD0d1Hh1a'
      }]

      return (
        <ul className="grilledCheese">
        
          <h3>Hmmm, we could'nt find a recipe using your selected ingredients! </h3>
          <h2>Might I suggest a Grilled Cheese?</h2>
          {recipe.map(recipes => {
            data = {
              name: recipes.recipe,
              ingredients: recipes.ingredients,
              url: recipes.url,
              image: recipes.image
            };
            console.log("WHAT ARE THE RECIPES", data);
            return (
              <div className="grilledcheeseclass">
                <h3>{data.name}</h3>
                <h4>{data.ingredients}</h4>
                <a href={data.url} target="_blank">
                  <img src={data.image} />
                </a>
                <br />
                {/* <a href={data.url} target="_blank">
                  Take Me To Recipe!
                </a> */}
                <FavoriteRecipe key={recipes.id} {...data} />
              </div>
            );
          })}
        </ul>
      );


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
                <a href={data.url} target="_blank">
                  <img src={data.image} />
                </a>
                <br />
                {/* <a href={data.url} target="_blank">
                  Take Me To Recipe!
                </a> */}
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
