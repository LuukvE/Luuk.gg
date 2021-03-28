import { useState, useCallback, useRef } from 'react';

import { useDispatch, actions } from '../store';

const apiURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const useGithub = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const abort = useRef<AbortController | null>(null);

  // Load Github contributions statistics
  const getContributions = useCallback(async () => {
    setLoading(true);

    // Abort previous getContributions requests
    if (abort.current) abort.current?.abort();

    // Allow the upcoming request to be aborted
    const { signal } = (abort.current = new AbortController());

    try {
      // Request contribution statistics from the API
      const res = await fetch(`${apiURL}/graphql`, {
        signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `query {
            github {
              get {
                contributions
                totalContributions
              }
            }
          }`
        })
      });

      if (signal.aborted) return { aborted: true };

      setLoading(false);

      const response = await res.json();

      // If an error occured, store it
      if (res.status >= 300) {
        dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

        return { error: response };
      }

      // // Store the Github contributions data
      dispatch(
        actions.set({
          github: response.data.github.get
        })
      );

      return { response };
    } catch (error) {
      setLoading(false);

      return { error };
    }
  }, [dispatch]);

  return {
    loading,
    getContributions
  };
};

export default useGithub;
