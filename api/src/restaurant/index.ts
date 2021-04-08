import {
  GraphQLFieldConfig,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import { GraphQLAny } from '../types';

import { resolveGetRestaurants, resolveGetProducts, resolveGetCategories } from './resolvers';

export const categoryFields = {
  _id: { type: GraphQLID },
  id: { type: GraphQLID },
  restaurant: { type: GraphQLID },
  name: { type: GraphQLString }
};

export const GraphQLCategory = new GraphQLObjectType({
  name: 'Category',
  fields: categoryFields
});

export const productFields = {
  _id: { type: GraphQLID },
  id: { type: GraphQLID },
  restaurant: { type: GraphQLID },
  name: { type: GraphQLString },
  description: { type: GraphQLString },
  categoryId: { type: GraphQLID },
  deliverymethod: { type: GraphQLInt },
  hasSizes: { type: GraphQLBoolean },
  is_meal: { type: GraphQLBoolean },
  price: { type: GraphQLFloat },
  price_pickup: { type: GraphQLFloat }
};

export const GraphQLProduct = new GraphQLObjectType({
  name: 'Product',
  fields: productFields
});

export const restaurantFields = {
  _id: { type: GraphQLID },
  id: { type: GraphQLID },
  excluded_from_minimum_amount: { type: GraphQLInt },
  user_latitude: { type: GraphQLAny },
  user_longitude: { type: GraphQLAny },
  allautoaddproductscosts: { type: GraphQLInt },
  deliverytype: { type: GraphQLInt },
  paymentMethod: { type: GraphQLAny },
  dynamicDeliveryCosts: { type: GraphQLString },
  open: { type: GraphQLString },
  pickup: { type: GraphQLInt },
  settings: { type: GraphQLAny },
  currency: { type: GraphQLAny },

  // Listing
  restaurant_id: { type: GraphQLString },
  category_ids: { type: GraphQLList(GraphQLInt) },
  sub_category_ids: { type: GraphQLList(GraphQLInt) },
  name: { type: GraphQLString },
  distance: { type: GraphQLInt },
  review: { type: GraphQLInt },
  price_index: { type: GraphQLFloat },
  minimum_delivery: { type: GraphQLFloat },
  index_key: { type: GraphQLInt },
  opening_status: { type: GraphQLInt },
  is_favorite: { type: GraphQLBoolean },
  delivery_cost: { type: GraphQLFloat },
  has_online_payment: { type: GraphQLInt },
  latitude: { type: GraphQLFloat },
  longitude: { type: GraphQLFloat },
  is_pickup: { type: GraphQLInt },
  average_delivery_time: { type: GraphQLInt },
  opening_times_takeaway: { type: GraphQLAny },
  exception_times_takeaway: { type: GraphQLAny },
  opening_times_pickup: { type: GraphQLAny },
  exception_times_pickup: { type: GraphQLAny },
  ranking: { type: GraphQLFloat },
  polygon: { type: GraphQLAny },
  is_disabled_for_delivery: { type: GraphQLBoolean },
  restaurant_status: { type: GraphQLInt },
  url: { type: GraphQLString },
  branch: { type: GraphQLString },
  logo: { type: GraphQLString },
  description: { type: GraphQLString },
  discounts_total: { type: GraphQLInt },
  has_meal_deals: { type: GraphQLBoolean },
  discounts_week: { type: GraphQLList(GraphQLBoolean) },
  restaurant_label: { type: GraphQLAny },
  restaurant_slogan: { type: GraphQLString },
  restaurant_address: { type: GraphQLString },
  review_count: { type: GraphQLInt },
  has_stampcards: { type: GraphQLBoolean },
  rankingPickup: { type: GraphQLFloat },
  promoted: { type: GraphQLInt },
  isHidden: { type: GraphQLBoolean },

  // Additional Info
  address: { type: GraphQLAny },
  aggregateRating: { type: GraphQLAny },
  geo: { type: GraphQLAny },
  image: { type: GraphQLString }
};

export const GraphQLRestaurant = new GraphQLObjectType({
  name: 'Restaurant',
  fields: restaurantFields
});

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
