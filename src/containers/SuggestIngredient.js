import React, { Component } from 'react';
import { connect } from 'react-redux';


class SuggestIngredient extends Component {
  constructor(props) {
    super(props) 
    
    this.state = {
      value: '',
      suggestions: []
    }
  }

  updateSearch(event) {
    this.setState({value: event.target.value});
    let filteredIngredients = this.props.searchIngredients.filter(ingredient => {
      return ingredient.name.indexOf(this.state.value) !== -1
    })
    this.state.suggestions.push(filteredIngredients)
  }

  handleSubmit(event) {

  }


  render () {
    

    return (
      <div className="search-container">
      <form className="search-form">
        <div className="search-row">
          <input type="text"
          placeholder="search"
          onChange={this.updateSearch.bind(this)} />
        </div>
      </form>
      </div>
    )
  }
}