import React from 'react';

export const FridgeListItem = ({ingredients}) => {

  return (
    <ul className="userFridge">
      {ingredients.map((element,idx) => {
        return (
          <div className="ingredient_name">
            <p>{element.name}</p>
          </div>
        )
      })}
          </ul>
  );
}

export default FridgeListItem;