import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  let loggedIn = JSON.parse(localStorage.getItem('id'));
  console.log('loggedin', loggedIn)

  if (loggedIn === null) {
    return (null)
  } else {
   return (
      <div className="navbar">
        <Link to="/fridge">Fridge</Link>
        <Link to="/scan">Barcode</Link>
        <Link to="/image">Image</Link>
        <Link to="/recipes">My Recipes</Link>
      </div>
    );
  }
};
