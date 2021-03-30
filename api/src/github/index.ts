import { GraphQLFieldConfig, GraphQLObjectType } from 'graphql';

import { GraphQLGithub } from './schemas';
import { resolveGet } from './resolvers';

export const githubQuery: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'GithubQuery',
    fields: {
      get: {
        type: GraphQLGithub,
        args: {},
        resolve: resolveGet
      }
    }
  })
};
