import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SuggestIngredient from "./SuggestIngredient";
import FridgeList from "../components/FridgeList";
import { addIngredient } from "../actions/SuggestAction";
import { loadFridge } from "../actions/FridgeAction";


class Fridge extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('mounting')
    const userId = 1;
    // const userId = this.props.match.params.id;
    this.props.loadFridge(userId);
  }

  render() {
  
    return (
      <div className="ParentFridgeClass">
      <FridgeList
      fridge={this.props.fridge}/>
        <SuggestIngredient />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.suggest.ingredients,
    fridge: state.fridge.fridge
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: newIngredient => {
      dispatch(addIngredient(newIngredient));
    },
    loadFridge: (id) => {
      dispatch(loadFridge(id))
    }
  };
};

const ConnectedFridge = connect(mapStateToProps, mapDispatchToProps)(Fridge);

export default withRouter((ConnectedFridge));
