import React from "react";
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
        <ul className="grilled-cheese">
          <header className="grilled-cheese__header">
            <h3>Hmmm, we could'nt find a recipe using your selected ingredients!</h3>
            <h3>Might I suggest a Grilled Cheese?</h3>
          </header>
          {recipe.map(recipes => {
            data = {
              name: recipes.recipe,
              ingredients: recipes.ingredients,
              url: recipes.url,
              image: recipes.image
            };

            return (
              <li className="recipe-list__item" key={1}>
                <header className="recipe-list__header">
                  <h3>{data.name}</h3>
                  <div className="recipe-list__image">
                    <a href={data.url} target="_blank">
                      <img src={data.image} />
                    </a>
                  </div>
                </header>
                <div className="recipe-list__container">
                  <p>{data.ingredients}</p>
                  <footer className="recipe-list__footer">
                    <a href={data.url} target="_blank">Take Me To Recipe!</a>
                    <FavoriteRecipe key={recipes.id} {...data} />
                  </footer>
                </div>
              </li>
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
              <li className="recipe-list__item" key={data.id}>
                <header className="recipe-list__header">
                  <h3>{data.name}</h3>
                  <div className="recipe-list__image">
                    <a href={data.url} target="_blank">
                      <img src={data.image} />
                    </a>
                  </div>
                </header>
                <div className="recipe-list__container">
                  <p>{data.ingredients}</p>
                  <footer className="recipe-list__footer">
                    <a href={data.url} target="_blank">Take Me To Recipe!</a>
                    <FavoriteRecipe key={recipes.id} {...data} />
                  </footer>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }
};

export default RecipeList;
