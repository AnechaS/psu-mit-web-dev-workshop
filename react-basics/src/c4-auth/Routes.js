import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import Home from "./home/Home";

export default class Routes extends Component {
  state = {
    isAuthorized: false,
  };

  loggedIn = () => {
    this.setState({ isAuthorized: true });
  }

  logout = () => {
    this.setState({ isAuthorized: false });
  }

  render() {
    const { isAuthorized } = this.state;
    return (
      <Router>
        <Switch>
          {!isAuthorized ? (
            <>
              <Redirect from="/" exact={true} to="/login" />
              <Route path="/login" >
                <LoginPage loggedIn={this.loggedIn} />
              </Route>
              <Route path="/register" component={RegisterPage} />
            </>
          ) : (
            <Redirect from="/login" to="/" />
          )}

          {!isAuthorized ? (
            <Redirect to="/login" />
          ) : (
            <Home logout={this.logout} />
          )}
        </Switch>
      </Router>
    );
  }
}
