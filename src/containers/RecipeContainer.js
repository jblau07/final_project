import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { loadRecipes } from "../actions/ItemsAction";
import RecipeList from '../components/RecipeList';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.handleSelected = this.handleSelected.bind(this);

  }


  handleSelected(event) {
    this.props.getRecipes(this.props.fridgeSelect);
    this.props.history.push("/recipes");
  }



  render() {
    
    let recipe = this.props.recipes;
    console.log('WHAT ARE YOU',recipe);
    if(recipe < 0){
      console.log('empty')
    }
    
    return (
      <div className='recipes'>
        <button onClick={this.handleSelected} type="submit">Selected</button>
        <h2 className='list_of_selected'>Selected Ingredients:</h2>
        {this.props.fridgeSelect.join(' ')}


       <ul className="userRecipes">
          { recipe > 0 &&
            recipe.map((recipes) => {
            return (
              
              <div className='allrecipes'>
                <h3>{recipes.recipe}</h3>
                <h4>{recipes.ingredients.join(', ')}</h4>
                <img href={recipes.url} src={recipes.image} />
                <a href={recipes.url}>Take Me To Recipe!</a>
              </div>
            )
          })}

        </ul>
       


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
    }
  }
}


const ConnectedRecipes = withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe))
export default ConnectedRecipes;
