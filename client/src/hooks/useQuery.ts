import { useCallback, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function useQuery() {
  const history = useHistory();
  const location = useLocation();

  // Create an object out of the URL query parameters
  const query = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const props: { [key: string]: string } = {};

    query.forEach((value, key) => {
      props[key] = value;
    });

    return props;
  }, [location.search]);

  // Push or replace the current URL with new query parameters coming from the update object
  const setQuery = useCallback(
    (update: { [key: string]: number | string | undefined }, options?: { replace?: boolean }) => {
      const query = new URLSearchParams(location.search);
      const newQuery: { [key: string]: string } = {};

      // First put all current query paramters into the new query parameters
      query.forEach((value, key) => {
        newQuery[key] = value;
      });

      // Then update or delete any new query parameters from the update object
      Object.keys(update).forEach((key) => {
        if (update[key]) newQuery[key] = `${update[key]}`;
        else delete newQuery[key];
      });

      // By default the browser navigates to the new URL, this option can replace it instead
      if (options && options.replace) {
        history.replace({
          pathname: history.location.pathname,
          search: new URLSearchParams(newQuery).toString()
        });
      } else {
        history.push({
          pathname: history.location.pathname,
          search: new URLSearchParams(newQuery).toString()
        });
      }
    },
    [history, location.search]
  );

  return {
    setQuery,
    query
  };
}

export default useQuery;
