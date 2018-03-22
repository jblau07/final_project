import React, { Component } from "react";
import CookbookRecipe from '../containers/CookbookRecipe';

export const CookbookList = ({savedRecipe}) => {
  let data;
  if(!savedRecipe || localStorage.length === 0) {
    return <div/>
  } else {
    return (
      <ul className="savedRecipes">
        {savedRecipe.map(savedRecipes => {
          data = {
            id: savedRecipes.recipes.id,
            name: savedRecipes.recipes.name,
            ingredients: savedRecipes.recipes.ingredients,
            url: savedRecipes.recipes.url,
            image: savedRecipes.recipes.image
          };  
          return (
            <div className="allrecipes">
            <h3>{data.name}</h3>
            <h4>{data.ingredients}</h4>
            <img href={data.url} src={data.image} />
            <a href={data.url} target="_blank">
              Take Me To Recipe!
            </a>
            <CookbookRecipe key={savedRecipes.id} {...data} />
          </div>
          )
        })}
        </ul>
    )
  }
}

export default CookbookList;