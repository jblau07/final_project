import React, { Component } from 'react';
import { connect } from 'react-redux';

function getSuggestions(value) {
  return
  [{name: "asparagus"}, {name: "broccoli"}, {name: "carrot"}, {name: "celery"}, {name: "cucumber"},
    {name: "corn"}, {name: "lettuce"}, {name: "cabbage"}, {name: "mushroom"}, {name: "onion"}, {name: "pepper"}]
}

function getSuggestionValue(suggestion) {
  return suggestion.name
}

class SuggestItem extends Component {
  constructor(props) {
    super(props) 
    
    this.state = {
      value: '',
      suggestions: []
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({suggestions: getSuggestions(value)})
  }

  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []})
  }

  render () {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type',
      onChange: this.onChange,
      value,
    };

    return (
      <div></div>
    )
  }



  // suggestItems(event) {
  //   this.setState({search: event.target.value});
  //   let filterItems = this.props.searchItems.filter(item => {
  //     return item.indexOf(this.state.search) !== -1
  //   });
  //   this.state.suggested.push(filterItems)
  // }

  handleSubmit (event) {
    event.preventDefault();

  }
}