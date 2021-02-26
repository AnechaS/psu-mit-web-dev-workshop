import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import LoginPage from './LoginPage';
import RegisterPage from '../c5-auth/pages/auth/RegisterPage';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

function PrivateRoute({ isAuthorized, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default class App extends Component {
  state = {
    isAuthorized: false,
    user: null,
  };

  loggedIn = () => {
    this.setState({
      isAuthorized: true,
      user: 'Batman',
    });
  };

  logout = () => {
    this.setState({
      isAuthorized: false,
      user: null,
    });
  };

  render() {
    const { isAuthorized, user } = this.state;

    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          <hr />

          <Switch>
            <Route path="/login">
              <LoginPage isAuthorized={isAuthorized} loggedIn={this.loggedIn} />
            </Route>

            <Route path="/register">
              <RegisterPage />
            </Route>

            <Route path="/about">
              <AboutPage />
            </Route>

            <PrivateRoute isAuthorized={isAuthorized} path="/">
              <HomePage />
            </PrivateRoute>

            <Route path="*">
              <div>Not Found Page.</div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
