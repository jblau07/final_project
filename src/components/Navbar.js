import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/fridge">Fridge</Link>
      <Link to="/scan">Barcode</Link>
      <Link to="/image">Image</Link>
      <Link to="/recipes">Recipes</Link>
    </div>
  );
};
