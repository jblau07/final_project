import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <a>
        <Link to="/">Fridge</Link>
      </a>
      <a>
        <Link to="/scan">Img/Bar</Link>
      </a>
      <a>
        <Link to="/recipes">Recipes</Link>
      </a>
    </div>
  );
};
