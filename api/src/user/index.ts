import { GraphQLString, GraphQLObjectType, GraphQLFieldConfig } from 'graphql';

import { GraphQLUser } from './schemas';
import { resolveSignIn, resolveSignOut, resolveUpdate } from './resolvers';

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
