import { useCallback } from 'react';

import { useDispatch, actions } from '../store';

const apiURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const useGraphQL = () => {
  const dispatch = useDispatch();

  const request = useCallback(
    async (query) => {
      try {
        const res = await fetch(`${apiURL}/graphql`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query
          })
        });

        const response = await res.json();

        // If an error occured, store it
        if (res.status >= 300) {
          dispatch(actions.set({ error: `${res.url}\n\n${JSON.stringify(response, null, 2)}` }));

          return { error: response };
        }

        return { response };
      } catch (error) {
        return { error };
      }
    },
    [dispatch]
  );

  const demo = useCallback(async () => {
    const result = await request(
      // `mutation {
      //   create(
      //     carname: "Ferrari 488 GTB"
      //     year: 2017
      //     transmission: "dual clutch auto"
      //     fuelType: "petrol"
      //     engineCapacity: 4000
      //   ) {
      //     _id
      //     carname
      //     year
      //     transmission
      //     fuelType
      //     engineCapacity
      //   }
      // }
      // `
      `query {
        vehicle(carname: "Ferrari 488 GTB") {
          carname
          year
          engineCapacity
        }
      }
    `
    );

    console.log(result);
  }, [request]);

  return {
    request,
    demo
  };
};

export default useGraphQL;
