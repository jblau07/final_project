import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadIngredients, addIngredient } from '../actions/SuggestAction' ;
import { clearAllSelected } from '../actions/FridgeAction';
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
    super(props);
    
    this.state = {
      value: '',
      suggestions: []
    }

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnClear = this.handleOnClear.bind(this);
  }

  componentDidMount(props) {
    this.props.loadIngredients()
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    })
  }

  handleOnClear() {
    this.props.clearAllSelected()
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

  handleOnSubmit (event) {
    event.preventDefault();
    if (this.state.value !== '') {
      this.props.addIngredient(this.state.value);
      this.setState({value: ''})
    }
  }

  render () {
    const { value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'search',
      value,
      onChange: this.onChange
    }

    return (
      <div className ="big-form">
      <form className="new-ing-form" onSubmit={this.handleOnSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <div className="add-ing">
          <button className="form-submit" type="submit">Submit</button>
        </div>
      </form>
        <div className="clear">
          <button onClick = {this.handleOnClear} className="clear-button">Clear All</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.suggest.ingredients,
    singleIngredient: state.suggest.singleIngredient
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadIngredients: () => {
      dispatch(loadIngredients());
    },
    addIngredient: (name) => {
      dispatch(addIngredient(name));
    },
    clearAllSelected: function () {
      dispatch(clearAllSelected())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestIngredient);