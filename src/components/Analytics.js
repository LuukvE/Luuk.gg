

import { RouterContext } from '../Router';

const config = {
  trackerId: 'UA-56436733-1',
  debug: false,
};

const Analytics = ({ children }) => {
  const { path } = React.useContext(RouterContext);
  const [initialized, setInitialized] = React.useState();

  React.useEffect(() => {
    if (!initialized) {
      const { trackerId, ...rest } = config;
      ReactGA.initialize(trackerId, { ...rest });
      setInitialized(true);
    }
    if (path) {
      ReactGA.set({ page: path });
      ReactGA.pageview(path);
    }
  }, [initialized, path]);

  return children;
};

Analytics.propTypes = {
  children: node.isRequired,
};

export default Analytics;
