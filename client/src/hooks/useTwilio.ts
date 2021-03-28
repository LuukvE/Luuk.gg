import { useCallback } from 'react';
import { nanoid } from 'nanoid';

import { useDispatch, actions } from '../store';

import useGraphQL from './useGraphQL';

const useTwilio = () => {
  const dispatch = useDispatch();
  const { loading, request } = useGraphQL();

  // Load a Twilio token based on room and identity
  const getTwilioToken = useCallback(
    async (room: string) => {
      // This is a unique string used to know what client is currently connecting
      let identity = '';

      // Find the identity previously saved or generate a new one
      try {
        identity = localStorage.getItem('identity') || nanoid();

        // Save the current identity
        localStorage.setItem('identity', identity);
      } catch (e) {}

      // Request a Twilio token from the API
      const { response, error } = await request({
        query: `query {
          room {
            get (room: "${room}", identity: "${identity}") {
              token
            }
          }
        }`
      });

      if (error) return { error };

      // Store the Twilio token
      dispatch(
        actions.set({
          twilio: response.data.room.get
        })
      );

      return { response };
    },
    [request, dispatch]
  );

  return {
    loading,
    getTwilioToken
  };
};

export default useTwilio;
