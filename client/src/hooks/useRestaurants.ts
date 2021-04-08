import { useCallback } from 'react';

import { useDispatch, actions } from '../store';
import { Restaurant } from '../types';

import useGraphQL from './useGraphQL';

const useRestaurants = () => {
  const dispatch = useDispatch();
  const { loading, request } = useGraphQL();

  const getAll = useCallback(async () => {
    const { response, error } = await request({
      query: `query {
        restaurant {
          getRestaurants {
            id
            name
            url
            description
          }
          getProducts {
            id
            restaurant
            name
            description
            price
          }
          getCategories {
            id
            restaurant
            name
          }
        }
      }`
    });

    if (error) return { error };

    const { getRestaurants, getProducts, getCategories } = response.data.restaurant;

    const items = getRestaurants.reduce(
      (restaurants: { [id: string]: Restaurant }, restaurant: any) => {
        const { id, name, url, description } = restaurant;

        restaurants[restaurant.id] = {
          id,
          name,
          description,
          url,
          categories: {},
          products: {}
        };

        return restaurants;
      },
      {}
    );

    getCategories.forEach((category: any) => {
      if (!items[category.restaurant]) return console.log(category);

      items[category.restaurant].categories[category.id] = category;
    });

    getProducts.forEach((product: any) => {
      const { id, name, price, description, restaurant } = product;

      if (!items[restaurant]) return console.log(product);

      items[restaurant].products[id] = {
        id,
        name,
        price,
        description
      };
    });

    dispatch(
      actions.set({
        restaurants: {
          items: Object.values(items)
        }
      })
    );

    return { response };
  }, [request, dispatch]);

  return {
    loading,
    getAll
  };
};

export default useRestaurants;
