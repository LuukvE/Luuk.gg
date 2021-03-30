import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFieldConfig
} from 'graphql';

import { Recipe, GraphQLRecipe, GraphQLAWSUpload, GraphQLRecipePayload } from './schemas';
import { resolveGetAll, resolveUploadImage, resolveSave } from './resolvers';

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
