import { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import mongoose, { Schema } from 'mongoose';
import querystring from 'querystring';
import fetch from 'node-fetch';

import { User } from './schemas';

const protocol = process.env.HTTPS_PORT ? 'https://' : 'http://';

export const resolveSignIn = async (_, fields, { cookies }) => {
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
};

export const resolveSignOut = (_, fields, { cookies }) => {
  cookies.set('signed-in-user', undefined, { signed: true });

  return 'OK';
};

export const resolveUpdate = (_, fields, { cookies }) => {
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
};
