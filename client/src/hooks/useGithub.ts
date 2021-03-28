import { useCallback } from 'react';

import { useDispatch, actions } from '../store';

import useGraphQL from './useGraphQL';

const useGithub = () => {
  const dispatch = useDispatch();
  const { loading, request } = useGraphQL();

  // Load Github contributions statistics
  const getContributions = useCallback(async () => {
    const { response, error } = await request({
      query: `query {
        github {
          get {
            contributions
            totalContributions
          }
        }
      }`
    });

    if (error) return { error };

    // Store the Github contributions data
    dispatch(
      actions.set({
        github: response.data.github.get
      })
    );

    return { response };
  }, [request, dispatch]);

  return {
    loading,
    getContributions
  };
};

export default useGithub;
