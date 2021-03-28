import { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import mongoose, { Schema } from 'mongoose';
import querystring from 'querystring';
import fetch from 'node-fetch';

import GraphQLDate from './scalars/date';
import { IUser } from './types';

const User = mongoose.model<IUser>(
  'user',
  new Schema({
    email: { type: String, unique: true, required: true, dropDups: true },
    name: { type: String, required: true },
    created: { type: Date, required: true },
    picture: { type: String }
  })
);

const userFields = {
  _id: { type: GraphQLID },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  picture: { type: GraphQLString },
  created: { type: GraphQLDate }
};

const UserSchema = new GraphQLObjectType({
  name: 'User',
  fields: userFields
});

const protocol = process.env.HTTPS_PORT ? 'https://' : 'http://';

export const userQuery: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'UserQuery',
    fields: {
      signIn: {
        type: UserSchema,
        args: { code: { type: GraphQLString } },
        resolve: async (_, fields, { cookies }) => {
          if (!fields.code) {
            const email = cookies.get('signed-in-user', { signed: true });

            if (!email) throw 'You are not signed in';

            return User.findOne({ email });
          }

          // Client has just signed into Google and was redirected with a code
          // Use the code to request an access and ID token
          const tokenRequest = await fetch(`https://oauth2.googleapis.com/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
              code: fields.code,
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              redirect_uri: `${protocol}${process.env.CLIENT_DOMAIN}/signin`,
              grant_type: 'authorization_code'
            })
          }).catch((error) => console.log(error));

          // If the request was not successful
          if (!tokenRequest) throw 'Token request failed';

          const tokens = await tokenRequest.json();

          // Get the user information with the access and id tokens
          const googleRequest = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${tokens.id_token}`
              }
            }
          );

          // If the request was not successful
          if (googleRequest.status >= 300) {
            console.log('Google user info error', googleRequest.status, await googleRequest.text());

            throw 'Google user info error';
          }

          const user = await googleRequest.json();

          // Save the users email address as a cookie
          // In order to find the user info without a redirect to Google next time
          cookies.set('signed-in-user', user.email, {
            signed: true,
            expires: new Date(2050, 1, 1)
          });

          return User.findOneAndUpdate({ email: user.email }, user, { upsert: true, new: true });
        }
      },
      signOut: {
        type: GraphQLString,
        args: {},
        resolve: (_, fields, { cookies }) => {
          cookies.set('signed-in-user', undefined, { signed: true });

          return 'OK';
        }
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
        type: UserSchema,
        args: {
          name: { type: GraphQLString }
        },
        resolve: (_, fields, { cookies }) => {
          fields.email = cookies.get('signed-in-user', { signed: true });

          if (!fields.email) throw 'You are not signed in';

          const user = User.findOne({ email: fields.email });

          if (!user) throw 'Your user account was not found';

          return User.findOneAndUpdate(
            { email: fields.email },
            {
              ...user,
              name: fields.name
            },
            {
              new: true
            }
          );
        }
      }
    }
  })
};
