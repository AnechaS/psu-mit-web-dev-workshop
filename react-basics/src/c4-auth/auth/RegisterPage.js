import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RegisterPage extends Component {
  render() {
    return (
      <div>
        Registor
        <Link to="/login">เข้าสู่ระบบ</Link>
      </div>
    );
  }
}
