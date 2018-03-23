import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../scss/styles.css";

import Main from "../reactRouter/Main";
import BarcodeScanner from "./BarcodeScanner";
import { loadRecipes, setActiveRecipe } from "../actions/ItemsAction";
import ActiveRecipe from "../components/ActiveRecipe";
import RecipesList from "../components/RecipeList";
import ImageCapture from "../containers/ImageCapture";
import SuggestIngredient from "../containers/SuggestIngredient";
import ButtonComponent from "../components/Login_RegisterButtons";
import LogoutContainer from "../containers/LogoutContainer";
import { Navbar } from "../components/Navbar";

class App extends Component {
  constructor(props) {
    super(props);

    this.recipeClickHandler = this.recipeClickHandler.bind(this);
    this.findRecipeByName = this.findRecipeByName.bind(this);
  }
  // componentDidMount() {
  //   this.props.loadRecipe();
  // }

  recipeClickHandler(event) {
    const recipeName = event.currentTarget.dataset.recipeName;
    if (recipeName) {
      const foundRecipe = this.findRecipeByName(recipeName);
      if (foundRecipe) {
        this.props.setActiveRecipe(foundRecipe);
      }
    }
  }

  findRecipeByName(name) {
    const foundRecipe = this.props.recipes.find(recipe => {
      return recipe.name === name;
    });
    if (foundRecipe) {
      return foundRecipe;
    }
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
        </header>
        <Main />
        <Navbar />
        {logoutButton}
      </div>
    );
  }
}

export default withRouter(App);
