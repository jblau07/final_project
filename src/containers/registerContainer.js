import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { register } from "../actions/registerAction";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRegister(event) {
    event.preventDefault();
    if (this.state.username !== "" && this.state.password !== "") {  
      this.props.register(this.state, () => {
        this.props.history.push("/");
  });
    }
  }

  render() {
    return (
      <div className="register_Container">
        {/* <h1 className="register_title">Register</h1> */}
        <div className="form_Register">
          <form onSubmit={this.handleRegister}>
            <div className="input_register" />
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Username"
            />
            <br />
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />

            <br />
            <div className="register_button">
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: function(user, redirectCallback) {
      dispatch(register(user, redirectCallback));
    }
  };
};

const ConnectedRegister = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);

export default ConnectedRegister;
