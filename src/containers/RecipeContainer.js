import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { loadRecipes, clearRecipes } from "../actions/ItemsAction";
import RecipeList from '../components/RecipeList';
import {FavRecipeContainer} from './FavRecipeContainer';


class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {recipesArr:this.props.recipes};

  }
  componentWillUnmount() {
    this.props.clearRecipes();
    console.log('inside CWU')
  }

  render() {

    console.log('WHAT ARE YOU', this.state.recipesArr);

    return (
      <div className='recipes'>

        <h2 className='list_of_selected'>Selected Ingredients:</h2>
        {this.props.fridgeSelect.join(' ')}
        <RecipeList recipe = {this.props.recipes} />

        <br />


      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes.recipes,
    fridgeIngr: state.fridge.fridge,
    fridgeSelect: state.fridge.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRecipes: (ingr) => {
      dispatch(loadRecipes(ingr))
    },
    clearRecipes: () => {
      dispatch(clearRecipes());
    }

  }
}


const ConnectedRecipes = withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe))
export default ConnectedRecipes;
