import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../actions/LoginAction";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleLogout}>
          <button type="submit">Logout</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logout: state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

const ConnectedButtons = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Logout)
);
export default ConnectedButtons;
