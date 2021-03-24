import { IncomingMessage, ServerResponse } from 'http';
import querystring from 'querystring';
import fetch from 'node-fetch';
import Cookies from 'cookies';

import { Users } from './types';

const protocol = process.env.HTTPS_PORT ? 'https://' : 'http://';

// Secret string that allows the API to securely sign cookies
// Signing a cookie forbids users from manually tampering with it
const keys = process.env.COOKIE_SIGN_KEYS.split(',');

// Authentication cookie stores the email address
// Email address is used to find the user inside this object
const users: Users = {};

// Redirect the user to a Google Sign-in Consent page
export const googleRedirect = async (request: IncomingMessage, response: ServerResponse) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify({
    redirect_uri: `${protocol}${process.env.CLIENT_DOMAIN}/signin`,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  })}`;

  response.writeHead(302, {
    Location: url
  });

  response.end();
};

// Removes the authentication cookie and responds with "null"
export const googleSignout = async (request: IncomingMessage, response: ServerResponse) => {
  const cookies = new Cookies(request, response, { keys });

  cookies.set('signed-in-user', undefined, { signed: true });

  response.writeHead(200);

  response.end(JSON.stringify(null));
};

// Responds with either a user object if signed in or "null" if signed out
export const googleAuthenticate = async (
  request: IncomingMessage,
  response: ServerResponse,
  body: { code: string }
) => {
  const cookies = new Cookies(request, response, { keys });

  // If no sign-in code given, find the user based on cookie or send "null"
  if (!body.code) {
    const email = cookies.get('signed-in-user', { signed: true });

    response.writeHead(200);

    return response.end(JSON.stringify(email ? users[email] || null : null));
  }

  // Client has just signed into Google and was redirected with a code
  // Use the code to request an access and ID token
  const tokenRequest = await fetch(`https://oauth2.googleapis.com/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      code: body.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${protocol}${process.env.CLIENT_DOMAIN}/signin`,
      grant_type: 'authorization_code'
    })
  }).catch((error) => console.log(error));

  // If the request was not successful, sign out
  if (!tokenRequest) return googleSignout(request, response);

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

  // If the request was not successful, sign out
  if (googleRequest.status >= 300) {
    console.log('Google user info error', googleRequest.status, await googleRequest.text());

    return googleSignout(request, response);
  }

  const user = await googleRequest.json();

  // Save this user information inside in-memory cache
  users[user.email] = user;

  // Save the users email address as a cookie
  // In order to find the user info without a redirect to Google next time
  cookies.set('signed-in-user', user.email, { signed: true, expires: new Date(2050, 1, 1) });

  response.writeHead(200);

  response.end(JSON.stringify(user));
};
