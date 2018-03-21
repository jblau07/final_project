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

    this.state = { isLoggedin: false };

    this.recipeClickHandler = this.recipeClickHandler.bind(this);
    this.findRecipeByName = this.findRecipeByName.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
    // if (this.props.user.id) {
    //   this.setState({ isLoggedin: true });
    // }
  }

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
    // let navbar = null;
    // let buttons = <ButtonComponent />;
    // let logoutButton;
    // if (localStorage.length > 0) {
    //   buttons = null;
    //   logoutButton = <LogoutContainer />;

    //   navbar = <Navbar />;
    // }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FINAL PROJECT WOO</h1>
        </header>
        {this.props.user && this.props.user.id ? (
          <div>
            <LogoutContainer />
            <div className="Main">
              <Main />
            </div>
            <Navbar />
          </div>
        ) : (
          <div className="Main">
            <Main />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.users.user
  };
};
export default connect(mapStateToProps, null)(App);
// export default connect(mapStateToProp, mapDispatchToProps)(App);
