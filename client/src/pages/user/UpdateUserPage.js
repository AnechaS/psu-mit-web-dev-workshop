import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { PARSE_MASTER_KEY } from '../../utils/constants';

class UpdateUserPage extends Component {
  state = {
    loading: false,
    isSeccess: false,
    error: '',
    username: '',
    email: '',
    password: '',
  };

  async componentDidMount() {
    const { match, history } = this.props;

    try {
      // get param id in react route.
      const id = match.params.id;

      // get user
      const { data } = await axios({
        url: `/classes/_User/${id}`,
        headers: {
          'X-Parse-Master-Key': PARSE_MASTER_KEY,
        },
      });

      this.setState({
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      // user not found, redirect to user page.
      history.replace('/users');
    }
  }

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

      const { username, email, password } = this.state;

      if (!username) {
        throw new Error('username is required');
      }

      if (!email) {
        throw new Error('email is required');
      }

      // get param id in react route.
      const id = this.props.match.params.id;

      let body = {
        username,
        email,
      };

      if (password) {
        body.password = password;
      }

      /* const { data } =  */ await axios({
        url: `/classes/_User/${id}`,
        method: 'PUT',
        headers: {
          'X-Parse-Master-Key': PARSE_MASTER_KEY,
        },
        data: body,
      });

      this.setState({
        loading: false,
        isSeccess: true,
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

    return (
      <div className="container-fluid">
        <h3 className="mb-3">Update User</h3>

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
              <strong>Update Successfully.</strong>
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

export default withRouter(UpdateUserPage);
