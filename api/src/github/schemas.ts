import { GraphQLObjectType, GraphQLInt, GraphQLID } from 'graphql';

import { GraphQLAny } from '../types';

export const GraphQLGithub = new GraphQLObjectType({
  name: 'Github',
  fields: {
    _id: { type: GraphQLID },
    contributions: { type: GraphQLAny },
    totalContributions: { type: GraphQLInt }
  }
});
