import './App.scss';
import '@fortawesome/fontawesome-free/js/all';
import 'react-app-polyfill/ie11';
import { Redirect, Switch, Route, NavLink } from 'react-router-dom';
import React, { FC } from 'react';

import Dashboard from './Dashboard';
import Career from './Career';

const App: FC = () => {
  return (
    <div className="App">
      <header>
        <NavLink to="/" className="logo">
          Luuk.gg
        </NavLink>

        <NavLink exact to="/">
          <i className="fas fa-th-large" /> Dashboard
        </NavLink>
        <NavLink to="/career">
          <i className="fas fa-laptop-code" /> Career
        </NavLink>
        <NavLink to="/cooking">
          <i className="fas fa-utensils" /> Cooking
        </NavLink>
        <NavLink to="/messenger">
          <i className="fab fa-slack" /> Messenger
        </NavLink>
        <NavLink to="/meeting">
          <i className="fas fa-video" /> Meeting
        </NavLink>
      </header>
      <main>
        <Switch>
          <Route path="/career">
            <Career />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
};

export default App;
