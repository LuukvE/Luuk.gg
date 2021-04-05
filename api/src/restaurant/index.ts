import { GraphQLObjectType, GraphQLList, GraphQLFieldConfig } from 'graphql';

import { GraphQLRestaurant, GraphQLProduct, GraphQLCategory } from './schemas';
import { resolveGetRestaurants, resolveGetProducts, resolveGetCategories } from './resolvers';

export const restaurantQuery: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'RestaurantQuery',
    fields: {
      getRestaurants: {
        type: new GraphQLList(GraphQLRestaurant),
        args: {},
        resolve: resolveGetRestaurants
      },
      getProducts: {
        type: new GraphQLList(GraphQLProduct),
        args: {},
        resolve: resolveGetProducts
      },
      getCategories: {
        type: new GraphQLList(GraphQLCategory),
        args: {},
        resolve: resolveGetCategories
      }
    }
  })
};
