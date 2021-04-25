import { graphql, GraphQLSchema, GraphQLObjectType } from 'graphql';
import { IncomingMessage, ServerResponse } from 'http';
import Cookies from 'cookies';

import { recipeQuery, recipeMutations } from './recipe';
import { userQuery, userMutations } from './user';
// import { restaurantQuery } from './restaurant';
import { githubQuery } from './github';
import { roomQuery } from './room';

// Secret string that allows the API to securely sign cookies
// Signing a cookie forbids users from manually tampering with it
const keys = process.env.COOKIE_SIGN_KEYS.split(',');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: userQuery,
      room: roomQuery,
      github: githubQuery,
      recipe: recipeQuery
      // restaurant: restaurantQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      user: userMutations,
      recipe: recipeMutations
    }
  })
});

export default async (
  request: IncomingMessage,
  response: ServerResponse,
  body: { query: string; variables: any } | null
) => {
  const cookies = new Cookies(request, response, { keys });

  const result = await graphql(
    schema,
    body?.query || '',
    undefined,
    { cookies },
    body?.variables || {}
  );

  response.writeHead(200);

  response.end(JSON.stringify(result));
};
