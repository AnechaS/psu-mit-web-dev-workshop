import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

class LoginPage extends Component {
  login = () => {
    this.props.history.replace('/');
    this.props.loggedIn()
  }

  render() {
    if (this.props.isAuthorized) {
      return <Redirect to="/" />  
    }

    return (
      <div>
        <h3>Login Page</h3>

        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default withRouter(LoginPage);