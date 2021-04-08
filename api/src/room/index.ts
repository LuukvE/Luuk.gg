import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFieldConfig } from 'graphql';

import { resolveGet } from './resolvers';

export const GraphQLRoom = new GraphQLObjectType({
  name: 'Room',
  fields: {
    token: { type: GraphQLString }
  }
});

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
