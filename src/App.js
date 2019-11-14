import React from 'react';
import URLSearchParams from 'url-search-params';
import { Grommet, Box } from 'grommet';
import { hp } from 'grommet-theme-hp';
import { Router, Route, Routes } from './Router';
import Analytics from './components/Analytics';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Landing from './screens/Landing';
import About from './screens/About';

export default () => {
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
        <Grommet full theme={hp}>
          <Box flex height="100%" direction="column">
            <Topbar />
            <Box
              flex
              direction="row"
              background="#fcfcfc"
            >
              <Sidebar />
              <Routes notFoundRedirect="/">
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
              </Routes>
            </Box>
          </Box>
        </Grommet>
      </Analytics>
    </Router>
  );
};
