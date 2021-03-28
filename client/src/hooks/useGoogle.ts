import { useCallback } from 'react';

import useQuery from '../hooks/useQuery';
import { defaultRecipes } from '../constants';
import { useSelector, useDispatch, actions } from '../store';

const apiURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const useGoogle = () => {
  const dispatch = useDispatch();
  const { setQuery } = useQuery();
  const slack = useSelector((state) => state.slack);

  const signin = useCallback(() => {
    const query = new URLSearchParams({
      redirect_uri: `${window.location.href.split('/').slice(0, 3).join('/')}/signin`,
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' ')
    }).toString();

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
  }, []);

  // Request our user object from the API either with a code, or using cookies
  const authenticate = useCallback(
    async (code: string) => {
      try {
        // Credentials: 'include' is required to send cookies
        const res = await fetch(`${apiURL}/graphql`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `query {
              user {
                signIn(code: "${code}") {
                  email
                  name
                  picture
                }
              }
            }`
          })
        });

        const response = await res.json();

        // If an error occured, store it
        if (res.status >= 300) {
          dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

          return { error: response };
        }

        const user = response.data.user.signIn;

        // Store the user data
        dispatch(
          actions.set({
            user: user.email ? user : null
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
      const res = await fetch(`${apiURL}/graphql`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `query {
            user {
              signOut
            }
          }`
        })
      });

      const response = await res.json();

      // If an error occured, store it
      if (res.status >= 300) {
        dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

        return { error: response };
      }

      // Clear user, messages and user recipes from memory
      dispatch(
        actions.set({
          user: null,
          slack: {
            ...slack,
            messages: []
          },
          cooking: {
            editId: null,
            deleteId: null,
            recipes: defaultRecipes
          }
        })
      );

      // Clear the "Only show my recipes" filter
      setQuery({ show: '' });

      return { response };
    } catch (error) {
      return { error };
    }
  }, [slack, setQuery, dispatch]);

  return {
    signin,
    signout,
    authenticate
  };
};

export default useGoogle;
