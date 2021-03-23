import { useState, useCallback, useRef } from 'react';
import { nanoid } from 'nanoid';

import { useDispatch, actions } from '../store';

const dev = process.env.NODE_ENV === 'development';

const apiURL = dev ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD;

const useAPI = () => {
  const dispatch = useDispatch();
  const abort = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(false);

  const getTwilioToken = useCallback(
    async (room: string) => {
      if (abort.current) abort.current?.abort();

      setLoading(true);

      const { signal } = (abort.current = new AbortController());

      let identity = '';

      try {
        identity = localStorage.getItem('identity') || nanoid();

        localStorage.setItem('identity', identity);
      } catch (e) {}

      try {
        const res = await fetch(`${apiURL}/twilio`, {
          signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            identity,
            room
          })
        });

        if (signal.aborted) return { aborted: true };

        setLoading(false);

        const response = await res.json();

        if (res.status >= 300) {
          dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

          return { error: response };
        }

        dispatch(
          actions.set({
            twilio: response
          })
        );

        return { response };
      } catch (error) {
        setLoading(false);

        return { error };
      }
    },
    [dispatch]
  );

  const getContributions = useCallback(async () => {
    if (abort.current) abort.current?.abort();

    setLoading(true);

    const { signal } = (abort.current = new AbortController());

    try {
      const res = await fetch(`${apiURL}/github`, {
        signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (signal.aborted) return { aborted: true };

      setLoading(false);

      const response = await res.json();

      if (res.status >= 300) {
        dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

        return { error: response };
      }

      dispatch(
        actions.set({
          github: response
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
    getTwilioToken,
    getContributions
  };
};

export default useAPI;
