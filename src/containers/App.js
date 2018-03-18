import React, { Component } from "react";
import { connect } from "react-redux";

import Main from "../reactRouter/Main";
import BarcodeScanner from "./BarcodeScanner";
import { loadRecipes, setActiveRecipe } from "../actions/ItemsAction";
import ActiveRecipe from "../components/ActiveRecipe";
import RecipesList from "../components/RecipeList";
import ImageRecognition from '../containers/ImageRecognition';
import SuggestIngredient from '../containers/SuggestIngredient';
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FINAL PROJECT WOO</h1>
        </header>
        <div className="Main">
          <Main />
        </div>
        <Navbar />
      </div>
    );
  }
}

// export default connect(mapStateToProp, mapDispatchToProps)(App);
export default App;
