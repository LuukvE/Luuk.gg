import { useCallback, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function useQuery() {
  const history = useHistory();
  const location = useLocation();

  return {
    setQuery: useCallback(
      (update: { [key: string]: number | string | undefined }, options?: { replace?: boolean }) => {
        const query = new URLSearchParams(location.search);
        const newQuery: { [key: string]: string } = {};

        query.forEach((value, key) => {
          newQuery[key] = value;
        });

        Object.keys(update).forEach((key) => {
          if (update[key]) newQuery[key] = `${update[key]}`;
          else delete newQuery[key];
        });

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
    ),
    query: useMemo(() => {
      const query = new URLSearchParams(location.search);
      const props: { [key: string]: string } = {};

      query.forEach((value, key) => {
        props[key] = value;
      });

      return props;
    }, [location.search])
  };
}

export default useQuery;
