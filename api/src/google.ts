import { IncomingMessage, ServerResponse } from 'http';
import { google } from 'googleapis';
import fetch from 'node-fetch';
import Cookies from 'cookies';

import { Users } from './types';

const protocol = process.env.HTTPS_PORT ? 'https://' : 'http://';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${protocol}${process.env.CLIENT_DOMAIN}/signin`
);

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

  const { tokens } = await oauth2Client.getToken(body.code);

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

    response.writeHead(500);

    return response.end();
  }

  const user = await googleRequest.json();

  users[user.email] = user;

  cookies.set('signed-in-user', user.email, { signed: true });

  response.writeHead(200);

  response.end(JSON.stringify(user));
};

export const googleRedirect = async (request: IncomingMessage, response: ServerResponse) => {
  const url = oauth2Client.generateAuthUrl({
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  });

  response.writeHead(302, {
    Location: url
  });

  response.end();
};
