import React, { Component } from "react";
import { Link } from "react-router-dom";

const users = [
  {
    username: "demo",
    password: "xxxxxx",
  },
];

export default class LoginPage extends Component {
  state = {
    message: "",
    username: "",
    password: "",
  };

  handleUsernameChange = (event) => {
    console.log(event.target.value);
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  login = () => {
    console.log("xx");
    const { username, password } = this.state;
    const { loggedIn } = this.props;

    // clear message
    this.setState({ message: "" });

    if (!username) {
      this.setState({ message: "username is requried" });
      return;
    }

    if (!password) {
      this.setState({ message: "password is requried" });
      return;
    }

    const user = users.find((o) => {
      return o.username === username && o.password === password;
    });

    if (typeof user === "undefined") {
      this.setState({ message: "Incorrect username or password" });
      return;
    }

    loggedIn();
  };

  render() {
    const { message } = this.state;

    return (
      <div className="container" style={{ maxWidth: 400 }}>

        <h3 className="mb-4">Login</h3>

        {message}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            onChange={this.handleUsernameChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={this.handlePasswordChange}
          />
        </div>

        <button onClick={this.login} className="btn btn-primary mr-3">
          Log in
        </button>

        <Link to="/register" className="btn btn-primary">
          ลงทะเบียน
        </Link>
      </div>
    );
  }
}
