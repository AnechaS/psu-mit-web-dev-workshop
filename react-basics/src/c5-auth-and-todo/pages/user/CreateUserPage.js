import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUserPage extends Component {
  state = {
    loading: false,
    isSeccess: false,
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

    try {
      this.setState({
        loading: true,
        error: '',
        isSeccess: false,
      });

      const { username, password, email } = this.state;

      if (!username) {
        throw new Error('username is required');
      }

      if (!email) {
        throw new Error('email is required');
      }

      if (!password) {
        throw new Error('password is required');
      }

      /* const { data } =  */ await axios.post('/classes/_User', {
        username,
        email,
        password,
      });

      this.setState({
        loading: false,
        isSeccess: true,
        username: '',
        email: '',
        password: '',
      });
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
    const { error, isSeccess, loading, username, email, password } = this.state;

    console.log(this.state);
    return (
      <div className="container-fluid">
        <h3 className="mb-3">Create User</h3>

        <form onSubmit={this.handleSubmit} style={{ maxWidth: 700 }}>
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Warning!</strong> {error}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          {isSeccess && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>Create Successfully.</strong>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          <div className="form-group row">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter Username"
                value={username}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button
                type="submit"
                className="btn btn-primary mr-3"
                disabled={loading}
              >
                Save
                {loading && (
                  <span
                    className="ml-1 spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
