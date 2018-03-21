import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectFromFridge, deselectFromFridge, deleteFromFridge, clearAllSelected } from "../actions/FridgeAction";

class FridgeIngredient extends Component {
  constructor(props) {
    super(props);
    this.handleOnSelected = this.handleOnSelected.bind(this)     
    this.handleOnDeselect = this.handleOnDeselect.bind(this)    
    this.handleOnDelete = this.handleOnDelete.bind(this)

  }


  handleOnSelected() {
    this.props.selectFromFridge(this.props.ingredients.name)
  }

  handleOnDeselect() {
    this.props.deselectFromFridge(this.props.ingredients.name)
  }

  handleOnDelete() {
    this.props.deleteFromFridge(this.props.ingredients.id)

  }

  render() {
    const { name } = this.props.ingredients;
      return (
        <ul className="card">
          <div className="attribute">{name}</div>
          
          <button onClick={this.handleOnSelected}>Select</button>
          <button onClick={this.handleOnDeselect}>Deselect</button>
          <button onClick={this.handleOnDelete}>Delete</button>
        
        </ul>
      )
  }

}


const mapStateToProps = state => {
  return {
    fridge: state.fridge.fridge,
    selected: state.fridge.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectFromFridge: function (name) {
      dispatch(selectFromFridge(name))
    },
    deselectFromFridge: function (name) {
      dispatch(deselectFromFridge(name))
    },
    deleteFromFridge: function (id) {
      dispatch(deleteFromFridge(id))
    },

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FridgeIngredient);
