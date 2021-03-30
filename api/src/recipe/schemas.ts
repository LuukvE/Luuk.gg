import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';
import mongoose, { Schema } from 'mongoose';

import { IRecipe, GraphQLDate, GraphQLAny } from '../types';

export const Recipe = mongoose.model<IRecipe>(
  'recipe',
  new Schema({
    cid: { type: String, required: true },
    name: { type: String, required: true },
    duration: { type: String, required: true },
    creator: { type: String, required: true },
    difficulty: { type: Number, required: true },
    image: { type: String },
    text: { type: String, required: true },
    created: { type: Date, required: true }
  })
);

export const recipeFields = {
  _id: { type: GraphQLID },
  cid: { type: GraphQLID },
  name: { type: GraphQLString },
  duration: { type: GraphQLString },
  creator: { type: GraphQLString },
  difficulty: { type: GraphQLInt },
  image: { type: GraphQLString },
  text: { type: GraphQLString },
  created: { type: GraphQLDate },
  deleted: { type: GraphQLBoolean }
};

export const GraphQLRecipe = new GraphQLObjectType({
  name: 'Recipe',
  fields: {
    ...recipeFields,
    cid: { type: GraphQLNonNull(GraphQLID) }
  }
});

export const GraphQLRecipePayload = new GraphQLInputObjectType({
  name: 'RecipePayload',
  fields: recipeFields
});

export const GraphQLAWSUpload = new GraphQLObjectType({
  name: 'AWSUpload',
  fields: {
    link: { type: GraphQLString },
    upload: { type: GraphQLAny }
  }
});
