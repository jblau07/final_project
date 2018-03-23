import React, { Component } from 'react';
import { connect } from 'react-redux';
import {postSavedRecipes} from '../actions/ItemsAction';
import{RecipeContainer} from './RecipeContainer';

class FavoriteRecipe extends Component {
  constructor(props){
    super(props);
    
    this.handleFavRecipes = this.handleFavRecipes.bind(this);
  }

  handleFavRecipes(event){
    let data = {
      name: this.props.name,
      ingredients:this.props.ingredients,
      url:this.props.url,
      image:this.props.image
    }
    console.log('HANDLEFAVRECIPE',data)
    
    this.props.favoriteRecipes(data)
  }

  render(){
    return(
      <div className ='fav_recipe_container'>
          <button onClick={this.handleFavRecipes}>
            <i className="far fa-bookmark"></i>
            <p>Save</p>
          </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cookbook:state.cookbook.cookbook
  }
}

const mapDispatchToProps = dispatch => {
  return{
    favoriteRecipes: (recipes)=>{
      dispatch(postSavedRecipes(recipes))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipe);
