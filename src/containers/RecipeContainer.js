import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {loadRecipes} from "../actions/ItemsAction";

class Recipe extends Component {
  constructor(props){
    super(props);

// this.state = ['apple','sugar','butter'];
  }

  componentWillMount (){
    this.props.getRecipes(this.state);
    console.log('awioejfaoweijfweiojfweiojfiwoejfiewji',this.props.recipes)
  }

 

render(){
  return(
    <div className = 'recipes'>


    
    </div>
  )
}
}

const mapStateToProps = state => {
  return{
    recipes: state.recipes.recipes
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
