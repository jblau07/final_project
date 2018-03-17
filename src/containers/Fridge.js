import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SuggestIngredient from "./SuggestIngredient";
import { addIngredient } from "../actions/SuggestAction";

class Fridge extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ParentFridgeClass">
        <SuggestIngredient />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.suggest.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: newIngredient => {
      dispatch(addIngredient(newIngredient));
    }
  };
};

const ConnectedFridge = connect(mapStateToProps, mapDispatchToProps)(Fridge);

export default withRouter(connect(mapStateToProps)(ConnectedFridge));
