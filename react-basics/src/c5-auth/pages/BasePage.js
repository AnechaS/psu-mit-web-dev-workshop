import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';

class BasePage extends Component {
  render() {
    const { user } = this.props;

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">iTodo</span>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>

            <span className="navbar-text">Hi, {user.username}</span>
            <Link className="nav-link" to="/logout">
              Sign out
            </Link>
          </div>
        </nav>

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps)(BasePage);
