import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "../scss/styles.css";

import Main from "../reactRouter/Main";
import BarcodeScanner from "./BarcodeScanner";
import { loadRecipes, setActiveRecipe } from "../actions/ItemsAction";
import RecipesList from "../components/RecipeList";
import ImageCapture from "../containers/ImageCapture";
import SuggestIngredient from "../containers/SuggestIngredient";
import ButtonComponent from "../components/Login_RegisterButtons";
import LogoutContainer from "../containers/LogoutContainer";
import { Navbar } from "../components/Navbar";
import { join } from "path";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let buttons = <ButtonComponent />;
    let logoutButton;
    if (localStorage.length > 0) {
      buttons = null;
      logoutButton = <LogoutContainer />;
    }

    let currentLocation = this.props.location.pathname;
    if (currentLocation === "/") {
      currentLocation = "home";
    } else {
      currentLocation = currentLocation.split("/").pop();
    }

    if (window.innerWidth > 768) {
      return (
        <main className="app" id={currentLocation}>
        <header className="app-header">
          <Link to="/fridge">
            <h1 className="app-title">Recip-Easy</h1>
          </Link>
          <ul className="header-links">
            <li><Link to="/fridge">Fridge</Link></li>
            <li><Link to="/scan">Barcode Scanner</Link></li>
            <li><Link to="/image">Image Capture</Link></li>
            <li><Link to="/cookbook">Cookbook</Link></li>
          </ul>
          {logoutButton}
        </header>
        <Main />
      </main>
      )
    }
    else {
      return (
        <main className="app" id={currentLocation}>
          <header className="app-header">
            <Link to="/fridge">
              <h1 className="app-title">Recip-Easy</h1>
            </Link>
            {logoutButton}
          </header>
          <Main />
          <Navbar />
        </main>
      );
    }
  }
}

export default withRouter(App);
