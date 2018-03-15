import React, { Component } from "react";
import { connect } from "react-redux";

import { loadRecipes, setActiveRecipe } from "../actions/ItemsAction";
import ActiveRecipe from "../components/ActiveRecipe";
import RecipesList from "../components/RecipeList";

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
        {/* <ActiveRecipe planet={this.props.activeRecipe} /> */}
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <RecipesList
          planets={this.props.recipes}
          recipeClickHandler={this.recipeClickHandler}
<<<<<<< HEAD:src/containers/App/App.js
        />
        <BarcodeScanner />
=======
        /> */}
        >>>>>>> 0254132529008f37637ae8887565233b26bff53c:src/containers/App.js
      </div>
    );
  }
}

// export default connect(mapStateToProp, mapDispatchToProps)(App);
export default App;
