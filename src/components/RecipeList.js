import React, { Component } from 'react';
import FavoriteRecipe from '../containers/FavRecipeContainer';

export const RecipeList = ({ recipe }) => {
  
  console.log('RECIPELIST', recipe);
  let data;
  if (!recipe) {
    return (
      <div></div>
    )
  } else {

    if (recipe < 0) {
      console.log('no recipes');
    }
    else {

      return (
        <ul className="userRecipes">
<<<<<<< HEAD
          {recipe.map((recipes) => {
            data = {
              name:recipes.recipe,
              ingredients:recipes.ingredients.join(', '),
              url:recipes.url,
              image:recipes.image
            }
            console.log('WHAT ARE THE RECIPES', data);
            return (
              
              <div className='allrecipes'>
                <h3>{data.name}</h3>
                <h4>{data.ingredients}</h4>
                <img href={data.url} src={data.image} />
                <a href={data.url} target="_blank" >Take Me To Recipe!</a>
                <FavoriteRecipe key={recipes.id} {...data} />
              </div>
=======
          {recipe.map((recipes, idx) => {
            return (
              <li key={idx} className='allrecipes'>
                <h3>{recipes.recipe}</h3>
                <h4>{recipes.ingredients.join(', ')}</h4>
                <img href={recipes.url} src={recipes.image} />
                <a href={recipes.url} target="_blank" >Take Me To Recipe!</a>
              </li>
>>>>>>> 5351581e241675d1e81684a2161e2423727a4f9b
            )
          })}
        </ul>
      );
    }
  }
}

export default RecipeList;