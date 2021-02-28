import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import * as authActions from '../../actions/auth';

class RegisterPage extends Component {
  state = {
    loading: false,
    error: '',
    username: '',
    email: '',
    password: '',
  };

  handleInputChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.target.value.trim() });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password, email } = this.state;
    const { login, history } = this.props;

    this.setState({
      error: '',
      loading: true,
    });

    try {
      if (!username) {
        throw new Error('username is required');
      }

      if (!email) {
        throw new Error('email is required');
      }

      if (!password) {
        throw new Error('password is required');
      }

      const { data } = await axios.post('/users', {
        username,
        email,
        password,
      });

      this.setState({ loading: false });

      const { sessionToken, ...o } = data;
      const user = {
        ...o,
        username,
        email,
      };

      login(sessionToken, user);
      history.push('/');
    } catch (error) {
      let msgError = error.message;
      if (Object(error.response).hasOwnProperty('status')) {
        if (error.response.status === 400) {
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
          <h3 className="text-left">Sign up page</h3>

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
              placeholder="Enter username"
              className="form-control"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={this.handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mr-3"
            disabled={loading}
          >
            Sign up
            {loading && (
              <span
                className="ml-1 spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </button>

          <Link to="/login">Sign in</Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { login: authActions.login };

export default connect(null, mapDispatchToProps)(withRouter(RegisterPage));
