import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div className="container pt-3">
        <div>
          <h3>Alert</h3>
          <div className="alert alert-primary" role="alert">
            A simple primary alert—check it out!
          </div>
        </div>

        <div className="mt-3">
          <h3>Button</h3>
          <button className="btn btn-primary">Primary</button>
        </div>

        <div className="mt-3">
          <h3>Card</h3>
          <div className="card">
            <div className="card-body">
              This is some text within a card body.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
