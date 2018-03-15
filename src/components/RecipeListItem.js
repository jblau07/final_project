import React from "react";

export const RecipeListItem = props => {
  const { recipeClickHandler } = props;
  return (
    <li onClick={recipeClickHandler} data-recipe-name={props.name}>
      <div className="recipeCard">
        <div className="attribute">
          <span>Name: </span>
          {props.name}
        </div>
        <div className="attribute">
          <span>Ingredients: </span>
          {props.ingredients}
        </div>
        <div className="attribute">
          <span>Link: </span>
          {props.url}
        </div>
        <div className="attribute">
          <span>Picture: </span>
          {props.image}
        </div>
      </div>
    </li>
  );
};

export default RecipeListItem;
