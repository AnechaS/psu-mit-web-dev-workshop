import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Logout from './pages/auth/Logout';
import BasePage from './pages/BasePage';

class Routes extends Component {
  render() {
    const { authToken } = this.props;

    return (
      <Router>
        <Switch>
          <Switch>
            {/* Route auth page */}
            {!authToken && (
              <Route>
                <Switch>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route path="/register">
                    <RegisterPage />
                  </Route>
                  <Redirect to="/login" />
                </Switch>
              </Route>
            )}

            <Route path="/logout">
              <Logout />
            </Route>

            {/* Route private pages */}
            {!authToken ? <Redirect to="/login" /> : <BasePage />}
          </Switch>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  authToken: auth.authToken,
});

export default connect(mapStateToProps)(Routes);
