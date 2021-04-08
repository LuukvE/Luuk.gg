import {
  GraphQLInputObjectType,
  GraphQLFieldConfig,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import { GraphQLDate, GraphQLAny } from '../types';

import { resolveGetAll, resolveUploadImage, resolveSave } from './resolvers';

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

export const recipeQuery: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'RecipeQuery',
    fields: {
      getAll: {
        type: new GraphQLList(GraphQLRecipe),
        args: {},
        resolve: resolveGetAll
      },
      uploadImage: {
        type: GraphQLAWSUpload,
        args: {
          fileName: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: resolveUploadImage
      }
    }
  })
};

export const recipeMutations: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'RecipeMutations',
    fields: {
      save: {
        type: GraphQLRecipe,
        args: {
          recipe: { type: GraphQLRecipePayload }
        },
        resolve: resolveSave
      }
    }
  })
};
