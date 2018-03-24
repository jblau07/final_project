import React from "react";
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
                  <a href={data.url} target="_blank">Go To Recipe</a>
                  <CookbookRecipe key={savedRecipes.id} {...data} />
                </footer>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default CookbookList;