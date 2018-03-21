import React from "react";

export const GenerateButton = () => {
  return (
    <div className="Recipe_generate-container">
      <a href='http://localhost:3000/recipes'>
        <button type="submit">Generate Recipes!</button>
      </a>
    </div>
  );
}

export default GenerateButton;