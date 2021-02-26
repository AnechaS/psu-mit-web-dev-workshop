import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import * as authActions from '../../actions/auth';

class LoginPage extends Component {
  state = {
    loading: false,
    error: '',
    username: '',
    password: '',
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value.trim() });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value.trim() });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const { history, dispatch } = this.props;

    this.setState({
      error: '',
      loading: true,
    });

    try {
      if (!username) {
        throw new Error('username is required');
      }

      if (!password) {
        throw new Error('password is required');
      }

      const response = await axios.post('/login', {
        username,
        password,
      });

      const { sessionToken, ...user } = response.data;
      
      // delete field ACL in user object.
      delete user.ACL;

      this.setState({
        loading: false,
      });

      dispatch(authActions.login(sessionToken, user));

      // redirect to home page.
      history.push('/');
    } catch (error) {
      let msgError = error.message;
      if (Object(error.response).hasOwnProperty('status')) {
        if (error.response.status === 404 && error.response.data.error) {
          msgError = error.response.data.error;
        }
      }

      this.setState({
        error: msgError,
        loading: false,
      });
    }
  };

  render() {
    const { error, loading } = this.state;

    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <form
          autoComplete="off"
          className="w-100"
          style={{ maxWidth: 330 }}
          onSubmit={this.handleSubmit}
        >
          <h3 className="text-left">Sign in page</h3>

          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Warning!</strong> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="typing your username"
              className="form-control"
              onChange={this.handleUsernameChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="typing your password"
              className="form-control"
              onChange={this.handlePasswordChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mr-3"
            disabled={loading}
          >
            Sign in
            {loading && (
              <span
                className="ml-1 spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </button>

          <Link to="/register">Sign up</Link>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(LoginPage));
