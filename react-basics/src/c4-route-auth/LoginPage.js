import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <h3>Login Page</h3>

        <button
          onClick={() => {
            this.props.login();
            this.props.history.push('/');
          }}
        >
          Log in
        </button>
      </div>
    );
  }
}

export default withRouter(LoginPage);
