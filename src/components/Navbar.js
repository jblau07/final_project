import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
        <Link to="/">Fridge</Link>
        <Link to="/scan">Bar</Link>
        <Link to="/image">Image</Link>
        <Link to="/recipes">Recipes</Link>
    </div>
  );
};
