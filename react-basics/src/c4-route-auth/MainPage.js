import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from './HomePage';
import AboutPage from './AboutPage';

export default function MainPage({ logout, user }) {
  return (
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

      <p>user: {user}</p>
      <button onClick={logout}>Log out</button>

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
    </div>
  );
}
