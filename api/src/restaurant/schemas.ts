import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
  GraphQLList
} from 'graphql';
import mongoose, { Schema, Document } from 'mongoose';

import { GraphQLAny } from '../types';

interface ICategory extends Document {
  id: string;
  name: string;
  restaurant: string;
}

export const Category = mongoose.model<ICategory>(
  'category',
  new Schema({
    id: { type: String, unique: true, required: true, dropDups: true },
    name: String,
    restaurant: String
  })
);

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

interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  restaurant: string;
  categoryId: string;
  deliverymethod: number;
  hasSizes: boolean;
  is_meal: boolean;
  price: number;
  price_pickup: number;
}

export const Product = mongoose.model<IProduct>(
  'product',
  new Schema({
    id: { type: String, unique: true, required: true, dropDups: true },
    name: String,
    description: String,
    restaurant: String,
    categoryId: String,
    deliverymethod: Number,
    hasSizes: Boolean,
    is_meal: Boolean,
    price: Number,
    price_pickup: Number
  })
);

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

interface IRestaurant extends Document {
  // Current Restaurant
  excluded_from_minimum_amount: number;
  user_latitude: boolean | number;
  user_longitude: boolean | number;
  allautoaddproductscosts: number;
  deliverytype: number;
  paymentMethod: any;
  dynamicDeliveryCosts: string;
  id: string;
  open: string;
  pickup: number;
  settings: {
    AutoAddedProducts: any[];
    Deliverycosts: any;
    Discounts: any[];
    PaymentMethods: {
      fixed: number;
      id: string;
      name: string;
      percentage: number;
    }[];
    PostcodeSupport: boolean;
    RemarksDisabled: boolean;
  };
  currency: {
    ISO4217: string;
    decimalsepparator: string;
    entity: string;
    nrofdecimals: number;
    symbol: string;
    symbolposition: string;
    thousandsepparator: string;
  };

  // Listing
  restaurant_id: string;
  category_ids: number[];
  sub_category_ids: number[];
  name: string;
  distance: number;
  review: number;
  price_index: number;
  minimum_delivery: number;
  index_key: number;
  opening_status: number;
  is_favorite: boolean;
  delivery_cost: number;
  has_online_payment: number;
  latitude: number;
  longitude: number;
  is_pickup: number;
  average_delivery_time: number;
  opening_times_takeaway: any;
  exception_times_takeaway:
    | boolean
    | {
        date: string;
        starttime: number;
        endtime: number;
      }[];
  opening_times_pickup: any;
  exception_times_pickup:
    | boolean
    | {
        date: string;
        starttime: number;
        endtime: number;
      }[];
  ranking: number;
  polygon: any;
  is_disabled_for_delivery: boolean;
  restaurant_status: number;
  restaurant_info_and_links: {
    name: string;
    url: string;
    branch: string;
    logo: string;
    categories: string;
  };
  discounts_total: number;
  has_meal_deals: boolean;
  discounts_week: boolean[];
  restaurant_label: any;
  restaurant_slogan: string;
  restaurant_address: string;
  review_count: number;
  has_stampcards: boolean;
  rankingPickup: number;
  promoted: number;
  isHidden: boolean;

  // Additional Info
  address: {
    '@type': string;
    addressCountry: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    streetAddress: string;
  };
  aggregateRating: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  image: string;
}

export const Restaurant = mongoose.model<IRestaurant>(
  'restaurant',
  new Schema({
    // Current Restaurant
    excluded_from_minimum_amount: Number,
    user_latitude: Schema.Types.Mixed,
    user_longitude: Schema.Types.Mixed,
    allautoaddproductscosts: Number,
    deliverytype: Number,
    paymentMethod: Schema.Types.Mixed,
    dynamicDeliveryCosts: String,
    id: { type: String, unique: true, required: true, dropDups: true },
    open: String,
    pickup: Number,
    settings: {
      AutoAddedProducts: [Schema.Types.Mixed],
      Deliverycosts: Schema.Types.Mixed,
      Discounts: [Schema.Types.Mixed],
      PaymentMethods: [
        {
          fixed: Number,
          id: String,
          name: String,
          percentage: Number
        }
      ],
      PostcodeSupport: Boolean,
      RemarksDisabled: Boolean
    },
    currency: {
      ISO4217: String,
      decimalsepparator: String,
      entity: String,
      nrofdecimals: Number,
      symbol: String,
      symbolposition: String,
      thousandsepparator: String
    },

    // Listing
    restaurant_id: String,
    category_ids: [Number],
    sub_category_ids: [Number],
    name: String,
    distance: Number,
    review: Number,
    price_index: Number,
    minimum_delivery: Number,
    index_key: Number,
    opening_status: Number,
    is_favorite: Boolean,
    delivery_cost: Number,
    has_online_payment: Number,
    latitude: Number,
    longitude: Number,
    is_pickup: Number,
    average_delivery_time: Number,
    opening_times_takeaway: Schema.Types.Mixed,
    exception_times_takeaway: Schema.Types.Mixed,
    opening_times_pickup: Schema.Types.Mixed,
    exception_times_pickup: Schema.Types.Mixed,
    ranking: Number,
    polygon: Schema.Types.Mixed,
    is_disabled_for_delivery: Boolean,
    restaurant_status: Number,
    restaurant_info_and_links: {
      name: String,
      url: String,
      branch: String,
      logo: String,
      categories: String
    },
    discounts_total: Number,
    has_meal_deals: Boolean,
    discounts_week: [Boolean],
    restaurant_label: Schema.Types.Mixed,
    restaurant_slogan: String,
    restaurant_address: String,
    review_count: Number,
    has_stampcards: Boolean,
    rankingPickup: Number,
    promoted: Number,
    isHidden: Boolean,

    // Additional Info
    address: {
      '@type': String,
      addressCountry: String,
      addressLocality: String,
      addressRegion: String,
      postalCode: String,
      streetAddress: String
    },
    aggregateRating: {
      '@type': String,
      ratingValue: String,
      reviewCount: String,
      bestRating: String
    },
    geo: {
      '@type': String,
      latitude: Number,
      longitude: Number
    },
    image: String
  })
);

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
  restaurant_info_and_links: { type: GraphQLAny },
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
