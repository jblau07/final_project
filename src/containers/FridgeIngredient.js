import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectFromFridge, deselectFromFridge, deleteFromFridge, clearAllSelected } from "../actions/FridgeAction";

class FridgeIngredient extends Component {
  constructor(props) {
    super(props);

    this.handleOnSelected = this.handleOnSelected.bind(this);
    this.handleOnDeselect = this.handleOnDeselect.bind(this);  
    this.handleOnDelete = this.handleOnDelete.bind(this);
  }

  componentWillUnmount() {
    // this.props.clearAllSelected();
  }

  handleOnSelected() {
    this.props.selectFromFridge(this.props.ingredients.name);
  }

  handleOnDeselect() {
    this.props.deselectFromFridge(this.props.ingredients.name);
  }

  handleOnDelete() {
    this.props.deleteFromFridge(this.props.ingredients.id);
  }

  render() {
    const { name } = this.props.ingredients;

    if (this.props.selected.includes(name) === false) {
      return (
        <li className="fridge-list__item">
          <button className="select-button" onClick={this.handleOnSelected}>
            <i className="far fa-fw fa-circle"></i>
          </button>
          <p className="ingredient-name">{name}</p>
          <button className="delete-button" onClick={this.handleOnDelete}>
            <i className="far fa-fw fa-trash-alt"></i>
          </button>
        </li>
      )
    }

    if (this.props.selected.includes(name) === true) {
      return (
        <li className="fridge-list__item">
          <button className="deselect-button" onClick={this.handleOnDeselect}>
            <i className="far fa-fw fa-check-circle"></i>
          </button>
          <p className="ingredient-name selected">{name}</p>
          <button className="delete-button" onClick={this.handleOnDelete}>
            <i className="far fa-fw fa-trash-alt"></i>
          </button>
        </li>
      )
    }
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
    clearAllSelected: () => {
      dispatch(clearAllSelected())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FridgeIngredient);
