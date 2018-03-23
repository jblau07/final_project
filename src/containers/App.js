import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
    if (this.props.location.pathname === "/") {
      currentLocation = "home";
    } else {
      currentLocation = currentLocation.split("/").pop();
    }

    return (
      <div className="Main" id={currentLocation}>
        <header className="App-header">
          <h1 className="App-title">Recip-Easy</h1>
          {logoutButton}
        </header>
        <Main />
        <Navbar />
      </div>
    );
  }
}

export default withRouter(App);
