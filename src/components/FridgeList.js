import React, { Component } from "react";
import FridgeIngredient from "../containers/FridgeIngredient";

export const FridgeList = ({ fridge }) => {
  let data;
  if (fridge.length === 0) {
    return <div />;
  } else{
      return (
        <ul className="userFridge">
          {fridge.map(ingredient => {
            return <FridgeIngredient key={ingredient.id} {...ingredient} />;
          })}
        </ul>
      );
    }
  }
;

export default FridgeList;
