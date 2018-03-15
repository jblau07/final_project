import React from "react";

export const ActiveRecipe = ({ recipe }) => {
  return (
    <div className="active-recipe">
      {recipe.name ? (
        <div className="Recipe-card">
          <div className="attribute">
            <span>Name: </span>
            {recipe.name}
          </div>
          <div className="attribute">
            <span>Ingredients: </span>
            {recipe.ingredients}
          </div>
          <div className="attribute">
            <span>Link: </span>
            {recipe.url}
          </div>
          <div className="attribute">
            <span>Picture: </span>
            {recipe.image}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ActiveRecipe;
