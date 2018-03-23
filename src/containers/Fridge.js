import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SuggestIngredient from "./SuggestIngredient";
import FridgeList from "../components/FridgeList";
import { loadRecipes } from "../actions/ItemsAction";

import { clearAllSelected } from '../actions/FridgeAction';
import { addIngredient } from "../actions/SuggestAction";
import { loadFridge } from "../actions/FridgeAction";

class Fridge extends Component {
  constructor(props) {
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleOnClear = this.handleOnClear.bind(this);
  }

  componentDidMount() {
    if(!localStorage.getItem('id')){
      this.props.history.push("/")
    }
    this.props.loadFridge();
  }

  handleSelected(event) {
    this.props.getRecipes(this.props.fridgeSelect, () => {
      this.props.history.push("/search")
    });

  }

  handleOnClear() {
    this.props.clearAllSelected()
  }

  render() {
    let findRecipes = null;
    if (this.props.fridgeSelect.length > 0) {

        findRecipes = <button onClick={this.handleSelected} type="submit">Find Recipes</button>

    }
    return (
      <div className="ParentFridgeClass">
        {findRecipes}
        
        {this.props.fridgeSelect.join(" ")}

        <SuggestIngredient />
        
        <FridgeList fridge={this.props.fridge} />

        <div className="clear">
          <button onClick = {this.handleOnClear} className="clear-button">Clear All</button>
        </div>
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
    loadFridge: () => {
      dispatch(loadFridge());
    },
    getRecipes: (ingr, redirectCallback) => {
      dispatch(loadRecipes(ingr, redirectCallback));
    },
    clearAllSelected: function () {
      dispatch(clearAllSelected())
    }
  };
};

const ConnectedFridge = connect(mapStateToProps, mapDispatchToProps)(Fridge);

export default withRouter(ConnectedFridge);
