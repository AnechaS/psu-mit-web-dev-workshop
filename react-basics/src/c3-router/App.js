import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import DashboardPage from "./DashboardPage";

export default function App() {
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
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <hr />

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="*">
            <div>
              Not Found Page.
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
