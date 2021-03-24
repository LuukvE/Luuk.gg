import { IncomingMessage, ServerResponse } from 'http';
import querystring from 'querystring';
import fetch from 'node-fetch';
import Cookies from 'cookies';

import { Users } from './types';

const protocol = process.env.HTTPS_PORT ? 'https://' : 'http://';

const users: Users = {};

export const googleSignout = async (request: IncomingMessage, response: ServerResponse) => {
  const cookies = new Cookies(request, response, { keys: process.env.COOKIE_SIGN_KEYS.split(',') });

  cookies.set('signed-in-user', undefined, { signed: true });

  response.writeHead(200);

  response.end(JSON.stringify(null));
};

export const googleAuthenticate = async (
  request: IncomingMessage,
  response: ServerResponse,
  body: { code: string }
) => {
  const cookies = new Cookies(request, response, { keys: process.env.COOKIE_SIGN_KEYS.split(',') });

  if (!body.code) {
    const email = cookies.get('signed-in-user', { signed: true });

    response.writeHead(200);

    return response.end(JSON.stringify(email ? users[email] || null : null));
  }

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

  if (!tokenRequest) {
    response.writeHead(200);

    return response.end(JSON.stringify(null));
  }

  const tokens = await tokenRequest.json();

  const googleRequest = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.id_token}`
      }
    }
  );

  if (googleRequest.status >= 300) {
    console.log('Google user info error', googleRequest.status, await googleRequest.text());

    response.writeHead(200);

    return response.end(JSON.stringify(null));
  }

  const user = await googleRequest.json();

  users[user.email] = user;

  cookies.set('signed-in-user', user.email, { signed: true, expires: new Date(2050, 1, 1) });

  response.writeHead(200);

  response.end(JSON.stringify(user));
};

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
