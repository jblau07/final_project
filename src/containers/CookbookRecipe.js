import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFromCookbook } from '../actions/CookbookAction';

class CookbookRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleOnDelete = this.handleOnDelete.bind(this)
  }

  handleOnDelete() {
    this.props.deleteFromCookbook(this.props.id)
  }
  
  render() {
  
    return (
      <div className = 'my_cookbook_container'>
        <button onClick={this.handleOnDelete}>REMOVE</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    myCookbook: state.cookbook.myCookbook
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCookbook: function (id, cb) {
      dispatch(deleteFromCookbook(id, cb))
    }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CookbookRecipe);