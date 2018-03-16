import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadIngredients } from '../actions/SuggestAction' ;
import Autosuggest from 'react-autosuggest';


const getSuggestionValue = suggestion => suggestion.name;

function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class SuggestIngredient extends Component {
  constructor(props) {
    super(props) 
    
    this.state = {
      value: '',
      suggestions: []
    }
  }

  componentDidMount(props) {
    this.props.loadIngredients()
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    })
  }
  getSuggestions = (value, array) => {

    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return array.filter(item => regex.test(item.name));
  };

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value, this.props.ingredients.data)
    })
  }
  
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render () {

    const { value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'search',
      value,
      onChange: this.onChange
    }
    
    return (

      <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.suggest.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadIngredients: function () {
      dispatch(loadIngredients());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestIngredient)