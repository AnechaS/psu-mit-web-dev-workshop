import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

export default class App extends Component {
  state = {
    isAuthorized: false,
  };

  login= () => {
    this.setState({
      isAuthorized: true,
    });
  };

  logout = () => {
    this.setState({
      isAuthorized: false,
    });
  };

  render() {
    const { isAuthorized } = this.state;

    return (
      <Router>
        <div>
          {isAuthorized && (
            <button
              onClick={this.logout}
            >
              Log out
            </button>
          )}

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
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
          <hr />

          <Switch>
            {/* Route auth page */}
            {!isAuthorized && (
              <Route>
                <Switch>
                  <Route path="/login">
                    <LoginPage login={this.login} />
                  </Route>
                  <Route path="/register">
                    <div>
                      <h3>Register Page</h3>
                    </div>
                  </Route>
                  <Redirect to="/login" />
                </Switch>
              </Route>
            )}

            {/* Route private pages */}
            {!isAuthorized ? (
              <Redirect to="/login" />
            ) : (
              <Route>
                <Switch>
                  <Route exact path="/">
                    <HomePage />
                  </Route>
                  <Route path="/about">
                    <AboutPage />
                  </Route>
                  <Route path="*">
                    <div>Not Found Page.</div>
                  </Route>
                </Switch>
              </Route>
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}
