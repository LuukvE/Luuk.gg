import { useCallback } from 'react';
import { defaultRecipes } from '../constants';

import { useDispatch, actions } from '../store';
import useQuery from '../hooks/useQuery';

const apiURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const useGoogle = () => {
  const dispatch = useDispatch();
  const { setQuery } = useQuery();

  // Request our user object from the API either with a code, or using cookies
  const authenticate = useCallback(
    async (code: string) => {
      try {
        // Credentials: 'include' is required to send cookies
        const res = await fetch(`${apiURL}/authenticate`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code // Code can be an empty string, in which case only cookies will be checked
          })
        });

        const response = await res.json();

        // If an error occured, store it
        if (res.status >= 300) {
          dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

          return { error: response };
        }

        // Store the user data
        dispatch(
          actions.set({
            user: response
          })
        );

        return { response };
      } catch (error) {
        return { error };
      }
    },
    [dispatch]
  );

  // Request the API to remove our cookie
  const signout = useCallback(async () => {
    try {
      const res = await fetch(`${apiURL}/signout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const response = await res.json();

      // If an error occured, store it
      if (res.status >= 300) {
        dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

        return { error: response };
      }

      // Store the user data, in this case, response should always be null
      // Also clear the user recipes from memory
      dispatch(
        actions.set({
          user: response,
          recipes: defaultRecipes
        })
      );

      // Clear the "Only show my recipes" filter
      setQuery({ show: '' });

      return { response };
    } catch (error) {
      return { error };
    }
  }, [setQuery, dispatch]);

  return {
    signout,
    authenticate
  };
};

export default useGoogle;
