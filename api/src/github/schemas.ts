import { GraphQLObjectType, GraphQLInt, GraphQLID } from 'graphql';
import mongoose, { Schema, Document } from 'mongoose';

import { GraphQLAny } from '../types';

interface IGithub extends Document {
  contributions: { [key: string]: number };
  totalContributions: number;
}

export const Github = mongoose.model<IGithub>(
  'github',
  new Schema({
    contributions: {},
    totalContributions: { type: Number, required: true }
  })
);

export const GraphQLGithub = new GraphQLObjectType({
  name: 'Github',
  fields: {
    _id: { type: GraphQLID },
    contributions: { type: GraphQLAny },
    totalContributions: { type: GraphQLInt }
  }
});
