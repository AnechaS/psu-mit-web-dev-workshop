import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as authActions from '../../actions/auth';

class Logout extends Component {
  componentDidMount() {
    const { authToken, logout } = this.props;

    if (authToken) {
      axios({
        url: '/logout',
        method: 'POST',
        headers: {
          'X-Parse-Session-Token': authToken,
        },
      });
    }

    logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = ({ auth }) => ({
  authToken: auth.authToken,
});

const mapDispatchToProps = {
  logout: authActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
