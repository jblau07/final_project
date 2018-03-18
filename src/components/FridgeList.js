import React from 'react';

export const FridgeList = ({fridge}) => {
  let data;
  if (fridge.length === 0) {
    return (
      <div></div>
    )
  } else {
    data = fridge.data;

      return (
        <ul className="userFridge">
          {data.map((element,idx) => {
            return (
              <div className="ingredient_name">
                <p>{element.ingredients.name}</p>
              </div>
            )
          })}
              </ul>
      );


  }
}

export default FridgeList;