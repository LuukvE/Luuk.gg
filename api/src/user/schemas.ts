import { GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql';
import mongoose, { Schema } from 'mongoose';

import { IUser, GraphQLDate } from '../types';

export const User = mongoose.model<IUser>(
  'user',
  new Schema({
    email: { type: String, unique: true, required: true, dropDups: true },
    name: { type: String, required: true },
    created: { type: Date, required: true },
    picture: { type: String }
  })
);

export const userFields = {
  _id: { type: GraphQLID },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  picture: { type: GraphQLString },
  created: { type: GraphQLDate }
};

export const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: userFields
});
