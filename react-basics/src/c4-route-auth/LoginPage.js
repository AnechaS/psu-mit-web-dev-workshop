import React, { Component } from 'react';

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <h3>Login Page</h3>

        <button onClick={() => this.props.loggedIn()}>Log in</button>
      </div>
    );
  }
}
