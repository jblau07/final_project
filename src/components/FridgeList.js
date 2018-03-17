import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadFridge} from '../actions/FridgeAction';
import FridgeListItem from './FridgeListItem';

class FridgeList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const userId = 1;
    // const userId = this.props.match.params.id;
    this.props.loadFridge(userId);
  }


render() {
  return (
    <div className="fridge-container">
    <FridgeListItem
      ingredients={this.props.fridge}/>
    </div>

  )
}
}

const mapStateToProps = state => {
  return {
    fridge: state.fridge.fridge
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadFridge: (id) => {
      dispatch(loadFridge(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FridgeList)