import React, { Children } from 'react';
import PropTypes from 'prop-types';

export const RouterContext = React.createContext({});

export const Router = ({ children }) => {
  const [path, setPath] = React.useState();
  const [search, setSearch] = React.useState();

  React.useEffect(() => {
    const onPopState = () => {
      const { location } = document;
      setPath(location.pathname);
      setSearch(location.search);
    };
    window.addEventListener('popstate', onPopState);
    onPopState();
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const go = (nextPath, target) => {
    if (nextPath !== path) {
      if (target) {
        window.open(nextPath, target);
      } else if (nextPath.startsWith('http')) {
        window.location = nextPath;
      } else {
        window.history.pushState(
          undefined,
          undefined,
          `${nextPath}${search || ''}`,
        );
        setPath(nextPath);
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <RouterContext.Provider value={{ path, search, go }}>
      {children}
    </RouterContext.Provider>
  );
};

Router.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Routes = ({ children, notFoundRedirect }) => {
  const { path: currentPath } = React.useContext(RouterContext);
  let found;
  Children.forEach(children, child => {
    if (
      !found &&
      currentPath &&
      currentPath.split('#')[0] === child.props.path
    ) {
      found = child;
    }
  });
  if (currentPath && !found) {
    window.location.replace(notFoundRedirect);
  }
  return found || null;
};

Routes.propTypes = {
  children: PropTypes.node.isRequired,
  notFoundRedirect: PropTypes.string.isRequired,
};

export const Route = ({ component: Comp, path, redirect }) => {
  const { path: currentPath } = React.useContext(RouterContext);
  if (currentPath && currentPath.split('#')[0] === path) {
    if (redirect) {
      window.location.replace(redirect);
    } else if (Comp) {
      return <Comp />;
    } else {
      console.error('Route missing component or redirect');
    }
  }
  return null;
};

Route.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string.isRequired,
  redirect: PropTypes.string,
};

Route.defaultProps = {
  component: undefined,
  redirect: undefined,
};

export default Router;
