import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import LoginPage from './LoginPage';
import RegisterPage from '../c5-auth/pages/auth/RegisterPage';
import MainPage from '../c4-route-auth/MainPage';

function AuthRoute({ authenticated, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { referer: props.location } }}
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
        <Switch>
          {!isAuthorized ? (
            [
              <Route path="/login">
                <LoginPage loggedIn={this.loggedIn} />
              </Route>,

              <Route path="/register">
                <RegisterPage />
              </Route>,
            ]
          ) : (
            <Redirect from="/" to="/" />
          )}

          {!isAuthorized ? (
            <Redirect to="/login" />
          ) : (
            <Route path="/">
              <MainPage user={user} logout={this.logout} />
            </Route>
          )}
        </Switch>
      </Router>
    );
  }
}
