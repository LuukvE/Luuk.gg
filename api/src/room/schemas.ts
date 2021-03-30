import { GraphQLObjectType, GraphQLString } from 'graphql';

export const GraphQLRoom = new GraphQLObjectType({
  name: 'Room',
  fields: {
    token: { type: GraphQLString }
  }
});
