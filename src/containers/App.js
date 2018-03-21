import React, { Component } from "react";
import { connect } from "react-redux";

import Main from "../reactRouter/Main";
import BarcodeScanner from "./BarcodeScanner";
import { loadRecipes, setActiveRecipe } from "../actions/ItemsAction";
import ActiveRecipe from "../components/ActiveRecipe";
import RecipesList from "../components/RecipeList";
import ImageCapture from '../containers/ImageCapture';
import SuggestIngredient from '../containers/SuggestIngredient';
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

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FINAL PROJECT WOO</h1>
        </header>
        {logoutButton}
        <div className="Main">
          <Main />
        </div>
        <Navbar />
      </div>
    );
  }
}

export default App;
