import React, { Component } from 'react';


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
          {recipe.map((recipes) => {
            return (
              <div className='allrecipes'>
                <h3>{recipes.recipe}</h3>
                <h4>{recipes.ingredients.join(', ')}</h4>
                <img href={recipes.url} src={recipes.image} />
                <a href={recipes.url} target="_blank" >Take Me To Recipe!</a>
              </div>
            )
          })}

        </ul>
      );
    }
  }
}

export default RecipeList;