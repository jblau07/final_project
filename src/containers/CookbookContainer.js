import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { loadMyCookbook } from '../actions/CookbookAction';
import CookbookList from '../components/CookbookList';

class Cookbook extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

    if(!localStorage.getItem('id')){
      this.props.history.push("/")
    }
    
    this.props.loadMyCookbook();
  }

  render() {

    return (
      <div className='cookbook'>
        <header className="view-title">
          <h2>My Cookbook</h2>
        </header>
        <CookbookList savedRecipe = {this.props.myCookbook}/>
      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      myCookbook: state.cookbook.myCookbook
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      loadMyCookbook: () => {
        dispatch(loadMyCookbook())
      }
    }
  }

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cookbook));