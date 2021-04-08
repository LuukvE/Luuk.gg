import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

import { GraphQLDate } from '../types';

import { resolveSignIn, resolveSignOut, resolveUpdate } from './resolvers';

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

export const userQuery: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'UserQuery',
    fields: {
      signIn: {
        type: GraphQLUser,
        args: { code: { type: GraphQLString } },
        resolve: resolveSignIn
      },
      signOut: {
        type: GraphQLString,
        args: {},
        resolve: resolveSignOut
      }
    }
  })
};

export const userMutations: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'UserMutations',
    fields: {
      update: {
        type: GraphQLUser,
        args: {
          name: { type: GraphQLString }
        },
        resolve: resolveUpdate
      }
    }
  })
};
