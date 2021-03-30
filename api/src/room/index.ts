import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFieldConfig } from 'graphql';

import { GraphQLRoom } from './schemas';
import { resolveGet } from './resolvers';

export const roomQuery: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'RoomQuery',
    fields: {
      get: {
        type: GraphQLRoom,
        args: {
          room: { type: new GraphQLNonNull(GraphQLString) },
          identity: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: resolveGet
      }
    }
  })
};
