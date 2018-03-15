import React from "react";

import RecipeListItem from "./RecipeListItem";

const RecipeList = ({ recipes, recipeClickHandler }) => {
  const recipesListContent = recipes.map((recipe, idx) => {
    return (
      <RecipeListItem
        key={idx}
        {...planet}
        recipeClickHandler={recipeClickHandler}
      />
    );
  });
  return <ul className="recipes-list">{recipesListContent}</ul>;
};

export default RecipeList;
