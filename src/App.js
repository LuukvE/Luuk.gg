import React from 'react';
import URLSearchParams from 'url-search-params';
import { Grommet, Box } from 'grommet';
import { Router, Route, Routes } from './Router';
import theme from './theme';
import routes from './routes';
import Analytics from './components/Analytics';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

export default () => {
  const [search, setSearch] = React.useState();

  React.useEffect(() => {
    if (window.location.search) {
      const { location: { search: nextSearch } } = window;
      const params = new URLSearchParams(nextSearch);

      setSearch(nextSearch);

      setThemeName(params.get('theme'));
    }
  }, []);

  return (
    <Router search={search}>
      <Analytics>
        <Grommet
          full
          theme={theme}
        >
          <Box
            flex
            height="100%"
            direction="column"
            background="rgba(0,0,0,0)"
          >
            <Topbar />
            <Box
              flex
              direction="row"
            >
              <Sidebar />
              <Routes notFoundRedirect="/">
                {routes.map(route => 
                  <Route
                    exact
                    key={route.path}
                    path={route.path}
                    component={route.screen}
                  />
                )}
              </Routes>
            </Box>
          </Box>
        </Grommet>
      </Analytics>
    </Router>
  );
};
