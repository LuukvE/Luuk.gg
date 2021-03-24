import './App.scss';
import '@fortawesome/fontawesome-free/js/all';
import 'react-app-polyfill/ie11';
import React, { FC, useRef, useEffect } from 'react';
import { Redirect, Switch, Route, NavLink } from 'react-router-dom';

import useAPI from '../hooks/useAPI';
import useQuery from '../hooks/useQuery';
import { useSelector } from '../store';

import Dashboard from './Dashboard';
import Messenger from './Messenger';
import Cooking from './Cooking';
import Meeting from './Meeting';
import Career from './Career';

const dev = process.env.NODE_ENV === 'development';

const apiURL = dev ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD;

const App: FC = () => {
  const { query } = useQuery();
  const { authenticate, signout } = useAPI();
  const socket = useRef<WebSocket | null>(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    authenticate(query.code || '');
  }, [authenticate]); // eslint-disable-line

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
          <i className="fas fa-code" /> Career
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
        {user ? (
          <div className="user-account">
            {!!user.picture && <img className="user-picture" src={user.picture} alt="" />}
            <span className="user-name">{user.name}</span>
            <span className="sign-out" onClick={() => signout()}>
              <i className="fas fa-sign-out-alt" />
            </span>
          </div>
        ) : (
          <a href={`${apiURL}/signin`} rel="noreferrer">
            <i className="fas fa-sign-in-alt" /> Sign in
          </a>
        )}
      </header>
      <main>
        <Switch>
          <Route path="/messenger">
            <Messenger socket={socket} />
          </Route>
          <Route path="/cooking">
            <Cooking />
          </Route>
          <Route path="/career">
            <Career />
          </Route>
          <Route path="/meeting">
            <Meeting />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
};

export default App;
