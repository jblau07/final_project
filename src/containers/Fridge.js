import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SuggestIngredient from "./SuggestIngredient";
import FridgeList from "../components/FridgeList";
import { loadRecipes } from "../actions/ItemsAction";

import { addIngredient } from "../actions/SuggestAction";
import { loadFridge } from "../actions/FridgeAction";
import ConnectedRecipes from '../containers/RecipeContainer';


class Fridge extends Component {
  constructor(props) {
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
  }

  componentDidMount() {
    this.props.loadFridge();
  }

  handleSelected(event) {
    this.props.getRecipes(this.props.fridgeSelect);
    this.props.history.push("/recipes");
  }

  render() {

    return (
      <div className="ParentFridgeClass">
      <button onClick={this.handleSelected} type="submit">Selected</button>
      {this.props.fridgeSelect.join(' ')}

        <FridgeList
          fridge={this.props.fridge} />
        <SuggestIngredient />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.suggest.ingredients,
    fridge: state.fridge.fridge,
    fridgeSelect: state.fridge.selected,
    recipes: state.recipes.recipes

  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: newIngredient => {
      dispatch(addIngredient(newIngredient));
    },
    loadFridge: (id) => {
      dispatch(loadFridge(id))
    },
    getRecipes: (ingr) => {
      dispatch(loadRecipes(ingr))
    }
  };
};

const ConnectedFridge = connect(mapStateToProps, mapDispatchToProps)(Fridge);

export default withRouter((ConnectedFridge));
