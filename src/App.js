import React from 'react';
import URLSearchParams from 'url-search-params';
import { Grommet } from 'grommet';
import { grommet, dark } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { aruba } from 'grommet-theme-aruba';
import { hp } from 'grommet-theme-hp';
import { dxc } from 'grommet-theme-dxc';
import { v1 } from 'grommet-theme-v1';
import { Router, Route, Routes } from './Router';
import Analytics from './components/Analytics';

import Landing from './screens/Landing';

const THEMES = {
  grommet,
  dark,
  hpe,
  aruba,
  hp,
  dxc,
  v1,
};

export default () => {
  const [themeName, setThemeName] = React.useState('hp');
  const [search, setSearch] = React.useState();

  React.useEffect(() => {
    if (window.location.search) {
      const {
        location: { search: nextSearch },
      } = window;
      const params = new URLSearchParams(nextSearch);
      setSearch(nextSearch);
      setThemeName(params.get('theme'));
    }
  }, []);

  return (
    <Router search={search}>
      <Analytics>
        <Grommet full theme={THEMES[themeName || 'grommet']}>
          <Routes notFoundRedirect="/">
            <Route exact path="/" component={Landing} />
          </Routes>
        </Grommet>
      </Analytics>
    </Router>
  );
};
