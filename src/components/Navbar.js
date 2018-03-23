import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  let loggedIn = JSON.parse(localStorage.getItem("id"));
  console.log("loggedin", loggedIn);

  if (loggedIn === null) {
    return null;
  } else {
    return (
      <nav className="navbar">
        <ul>
          <li className="navbar-icon">
            <Link to="/fridge">
              <img src="/assets/fridge.svg" />
            </Link>
          </li>
          <li className="navbar-icon">
            <Link to="/scan">
              <img src="/assets/barcode.svg" />
            </Link>
          </li>
          <li className="navbar-icon">
            <Link to="/image">
              <img src="/assets/scan.svg" />
            </Link>
          </li>
          <li className="navbar-icon">
            <Link to="/recipes">
              <img src="/assets/cookbook.svg" />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};
