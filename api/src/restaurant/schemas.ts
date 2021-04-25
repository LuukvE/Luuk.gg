// interface ICategory extends Document {
//   id: string;
//   name: string;
//   restaurant: string;
// }

// export const Category = mongoose.model<ICategory>(
//   'category',
//   new Schema({
//     id: { type: String, unique: true, required: true, dropDups: true },
//     name: String,
//     restaurant: String
//   })
// );

// interface IProduct extends Document {
//   id: string;
//   name: string;
//   description: string;
//   restaurant: string;
//   categoryId: string;
//   deliverymethod: number;
//   hasSizes: boolean;
//   is_meal: boolean;
//   price: number;
//   price_pickup: number;
// }

// export const Product = mongoose.model<IProduct>(
//   'product',
//   new Schema({
//     id: { type: String, unique: true, required: true, dropDups: true },
//     name: String,
//     description: String,
//     restaurant: String,
//     categoryId: String,
//     deliverymethod: Number,
//     hasSizes: Boolean,
//     is_meal: Boolean,
//     price: Number,
//     price_pickup: Number
//   })
// );

// interface IRestaurant extends Document {
//   // Current Restaurant
//   excluded_from_minimum_amount: number;
//   user_latitude: boolean | number;
//   user_longitude: boolean | number;
//   allautoaddproductscosts: number;
//   deliverytype: number;
//   paymentMethod: any;
//   dynamicDeliveryCosts: string;
//   id: string;
//   open: string;
//   pickup: number;
//   settings: {
//     AutoAddedProducts: any[];
//     Deliverycosts: any;
//     Discounts: any[];
//     PaymentMethods: {
//       fixed: number;
//       id: string;
//       name: string;
//       percentage: number;
//     }[];
//     PostcodeSupport: boolean;
//     RemarksDisabled: boolean;
//   };
//   currency: {
//     ISO4217: string;
//     decimalsepparator: string;
//     entity: string;
//     nrofdecimals: number;
//     symbol: string;
//     symbolposition: string;
//     thousandsepparator: string;
//   };

//   // Listing
//   restaurant_id: string;
//   category_ids: number[];
//   sub_category_ids: number[];
//   name: string;
//   distance: number;
//   review: number;
//   price_index: number;
//   minimum_delivery: number;
//   index_key: number;
//   opening_status: number;
//   is_favorite: boolean;
//   delivery_cost: number;
//   has_online_payment: number;
//   latitude: number;
//   longitude: number;
//   is_pickup: number;
//   average_delivery_time: number;
//   opening_times_takeaway: any;
//   exception_times_takeaway:
//     | boolean
//     | {
//         date: string;
//         starttime: number;
//         endtime: number;
//       }[];
//   opening_times_pickup: any;
//   exception_times_pickup:
//     | boolean
//     | {
//         date: string;
//         starttime: number;
//         endtime: number;
//       }[];
//   ranking: number;
//   polygon: any;
//   is_disabled_for_delivery: boolean;
//   restaurant_status: number;
//   url: string;
//   branch: string;
//   logo: string;
//   description: string;
//   discounts_total: number;
//   has_meal_deals: boolean;
//   discounts_week: boolean[];
//   restaurant_label: any;
//   restaurant_slogan: string;
//   restaurant_address: string;
//   review_count: number;
//   has_stampcards: boolean;
//   rankingPickup: number;
//   promoted: number;
//   isHidden: boolean;

//   // Additional Info
//   address: {
//     '@type': string;
//     addressCountry: string;
//     addressLocality: string;
//     addressRegion: string;
//     postalCode: string;
//     streetAddress: string;
//   };
//   aggregateRating: {
//     '@type': string;
//     ratingValue: string;
//     reviewCount: string;
//     bestRating: string;
//   };
//   geo: {
//     '@type': string;
//     latitude: number;
//     longitude: number;
//   };
//   image: string;
// }

// export const Restaurant = mongoose.model<IRestaurant>(
//   'restaurant',
//   new Schema({
//     // Current Restaurant
//     excluded_from_minimum_amount: Number,
//     user_latitude: Schema.Types.Mixed,
//     user_longitude: Schema.Types.Mixed,
//     allautoaddproductscosts: Number,
//     deliverytype: Number,
//     paymentMethod: Schema.Types.Mixed,
//     dynamicDeliveryCosts: String,
//     id: { type: String, unique: true, required: true, dropDups: true },
//     open: String,
//     pickup: Number,
//     settings: {
//       AutoAddedProducts: [Schema.Types.Mixed],
//       Deliverycosts: Schema.Types.Mixed,
//       Discounts: [Schema.Types.Mixed],
//       PaymentMethods: [
//         {
//           fixed: Number,
//           id: String,
//           name: String,
//           percentage: Number
//         }
//       ],
//       PostcodeSupport: Boolean,
//       RemarksDisabled: Boolean
//     },
//     currency: {
//       ISO4217: String,
//       decimalsepparator: String,
//       entity: String,
//       nrofdecimals: Number,
//       symbol: String,
//       symbolposition: String,
//       thousandsepparator: String
//     },

//     // Listing
//     restaurant_id: String,
//     category_ids: [Number],
//     sub_category_ids: [Number],
//     name: String,
//     distance: Number,
//     review: Number,
//     price_index: Number,
//     minimum_delivery: Number,
//     index_key: Number,
//     opening_status: Number,
//     is_favorite: Boolean,
//     delivery_cost: Number,
//     has_online_payment: Number,
//     latitude: Number,
//     longitude: Number,
//     is_pickup: Number,
//     average_delivery_time: Number,
//     opening_times_takeaway: Schema.Types.Mixed,
//     exception_times_takeaway: Schema.Types.Mixed,
//     opening_times_pickup: Schema.Types.Mixed,
//     exception_times_pickup: Schema.Types.Mixed,
//     ranking: Number,
//     polygon: Schema.Types.Mixed,
//     is_disabled_for_delivery: Boolean,
//     restaurant_status: Number,
//     url: String,
//     branch: String,
//     logo: String,
//     description: String,
//     discounts_total: Number,
//     has_meal_deals: Boolean,
//     discounts_week: [Boolean],
//     restaurant_label: Schema.Types.Mixed,
//     restaurant_slogan: String,
//     restaurant_address: String,
//     review_count: Number,
//     has_stampcards: Boolean,
//     rankingPickup: Number,
//     promoted: Number,
//     isHidden: Boolean,

//     // Additional Info
//     address: {
//       '@type': String,
//       addressCountry: String,
//       addressLocality: String,
//       addressRegion: String,
//       postalCode: String,
//       streetAddress: String
//     },
//     aggregateRating: {
//       '@type': String,
//       ratingValue: String,
//       reviewCount: String,
//       bestRating: String
//     },
//     geo: {
//       '@type': String,
//       latitude: Number,
//       longitude: Number
//     },
//     image: String
//   })
// );
