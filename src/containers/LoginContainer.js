import React, {Component} from "react";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import { loginAction } from "../actions/LoginAction";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handlelogin = this.handlelogin.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  handlelogin(event) {
    event.preventDefault();


    this.props.login(this.state);
    this.props.history.push("/fridge")

  }

    render() {
      return (
        <div className = 'login_Container'>
          <h1>Login</h1>

          <form onSubmit={this.handlelogin}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Username"
          />
          <br/>
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <button type="submit">Submit</button>
        </form>
          </div>
      )
    }

}

const mapStateToProps = state => {
  return{
    login:state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login:user => {
      dispatch(loginAction(user));
    }
  }
}
const ConnectedLogin = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);

export default ConnectedLogin;