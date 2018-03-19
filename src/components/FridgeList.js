import React, {Component} from 'react';
import FridgeIngredient from '../containers/FridgeIngredient';

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
        {data.map((ingredient) => {
          return (
            <FridgeIngredient
              key={ingredient.id}
              {...ingredient}/>
          )
        })}
            </ul>
    );
  }
}

export default FridgeList;