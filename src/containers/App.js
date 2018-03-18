import React, { Component } from "react";
import { connect } from "react-redux";

import Main from "../reactRouter/Main";
import BarcodeScanner from "./BarcodeScanner";
import { loadRecipes, setActiveRecipe } from "../actions/ItemsAction";
import ActiveRecipe from "../components/ActiveRecipe";
import RecipesList from "../components/RecipeList";
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

    let buttons =  <ButtonComponent />;
    let logoutButton;
    if(localStorage.length > 0){
      buttons = null;
      logoutButton =  <LogoutContainer />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FINAL PROJECT WOO</h1>
        </header>
        <ButtonComponent />
        <LogoutContainer />
        <div className="Main">

          <Main />
        </div>
        {/* <ActiveRecipe planet={this.props.activeRecipe} /> */}
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <RecipesList
          planets={this.props.recipes}
          recipeClickHandler={this.recipeClickHandler}

        />
        
      /> */}
        {/* <BarcodeScanner /> */}
        <Navbar />
      </div>
    );
  }
}

// export default connect(mapStateToProp, mapDispatchToProps)(App);
export default App;
