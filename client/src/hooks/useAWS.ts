import { useState, useCallback } from 'react';

import { AWSUploadResponse } from '../types';
import { defaultRecipes } from '../constants';
import { useSelector, useDispatch, actions } from '../store';

const apiURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const useAWS = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user, recipes } = useSelector((state) => state);

  // Upload image to AWS S3
  const upload = useCallback(
    async (filename: string) => {
      setLoading(true);

      try {
        // Request a pre-signed upload URL for an image
        const res = await fetch(`${apiURL}/upload`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filename
          })
        });

        setLoading(false);

        const response = await res.json();

        // If an error occured, store it
        if (res.status >= 300) {
          dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

          return { error: response };
        }

        return { response: response as AWSUploadResponse };
      } catch (error) {
        setLoading(false);

        return { error };
      }
    },
    [dispatch]
  );

  // Save recipes to AWS S3
  const saveRecipes = useCallback(async () => {
    setLoading(true);

    try {
      // Request saving all recipes created by this user
      const res = await fetch(`${apiURL}/save-recipes`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipes.filter((recipe) => recipe.creator === user?.email))
      });

      setLoading(false);

      const response = await res.json();

      // If an error occured, store it
      if (res.status >= 300) {
        dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

        return { error: response };
      }

      return { response: response };
    } catch (error) {
      setLoading(false);

      return { error };
    }
  }, [recipes, user, dispatch]);

  // Load recipes from AWS S3
  const loadRecipes = useCallback(async () => {
    setLoading(true);

    try {
      // Request all recipes created by this user
      const res = await fetch(
        `https://s3.eu-central-1.amazonaws.com/${process.env.REACT_APP_AWS_BUCKET}/${user?.email}/index.json`,
        {
          method: 'GET',
          headers: {
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
          }
        }
      );

      setLoading(false);

      const response = await res.json();

      // If an error occured, store it
      if (res.status >= 300) {
        dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

        return { error: response };
      }

      dispatch(
        actions.set({
          recipes: [...response, ...defaultRecipes]
        })
      );

      return { response: response };
    } catch (error) {
      setLoading(false);

      return { error };
    }
  }, [user, dispatch]);

  return {
    upload,
    loading,
    saveRecipes,
    loadRecipes
  };
};

export default useAWS;
