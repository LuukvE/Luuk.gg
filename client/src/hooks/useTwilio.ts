import { useState, useCallback, useRef } from 'react';
import { nanoid } from 'nanoid';

import { useDispatch, actions } from '../store';

const apiURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const useTwilio = () => {
  const dispatch = useDispatch();
  const abort = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(false);

  // Load a Twilio token based on room and identity
  const getTwilioToken = useCallback(
    async (room: string) => {
      setLoading(true);

      // Abort previous getTwilioToken requests
      if (abort.current) abort.current?.abort();

      // Allow the upcoming request to be aborted
      const { signal } = (abort.current = new AbortController());

      // This is a unique string used to know what client is currently connecting
      let identity = '';

      // Find the identity previously saved or generate a new one
      try {
        identity = localStorage.getItem('identity') || nanoid();

        // Save the current identity
        localStorage.setItem('identity', identity);
      } catch (e) {}

      // Request a Twilio token from the API
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

        // If an error occured, store it
        if (res.status >= 300) {
          dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

          return { error: response };
        }

        // Store the Twilio token
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

  return {
    loading,
    getTwilioToken
  };
};

export default useTwilio;
