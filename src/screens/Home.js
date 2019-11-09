import React, { Component } from 'react';
import { Box } from 'grommet';
import Nav from '../components/Nav';
import Header from '../components/Header';

export default class Home extends Component {
  componentDidMount() {
    document.title = 'Luuk.gg';
  }

  render() {
    return (
      <Box>
        <Nav />

        <Header
          label="useful boilerplate"
          summary="containing many standard forms and pages"
        />

        <ul>
          <li>Landing</li>
          <li>Sign up</li>
          <li>Dashboard</li>
          <li>Account</li>
        </ul>
      </Box>
    );
  }
}
