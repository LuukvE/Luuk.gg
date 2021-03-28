import { useCallback } from 'react';

import useQuery from '../hooks/useQuery';
import { defaultRecipes } from '../constants';
import { useSelector, useDispatch, actions } from '../store';

import useGraphQL from './useGraphQL';

const useGoogle = () => {
  const dispatch = useDispatch();
  const { setQuery } = useQuery();
  const { request } = useGraphQL();
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
      const { response, error } = await request({
        query: `query {
          user {
            signIn(code: "${code}") {
              email
              name
              picture
            }
          }
        }`
      });

      if (error) return { error };

      const user = response.data.user.signIn;

      // Store the user data
      dispatch(
        actions.set({
          user: user.email ? user : null
        })
      );

      return { response };
    },
    [request, dispatch]
  );

  // Request the API to remove our cookie
  const signout = useCallback(async () => {
    const { response, error } = await request({
      query: `query {
        user {
          signOut
        }
      }`
    });

    if (error) return { error };

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
  }, [slack, request, setQuery, dispatch]);

  return {
    signin,
    signout,
    authenticate
  };
};

export default useGoogle;
