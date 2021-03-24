import { IncomingMessage, ServerResponse } from 'http';
import { nanoid } from 'nanoid';
import Cookies from 'cookies';
import AWS from 'aws-sdk';
import mime from 'mime';

import { Recipe } from './types';

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4'
});

const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

// Secret string that allows the API to securely sign cookies
// Signing a cookie forbids users from manually tampering with it
const keys = process.env.COOKIE_SIGN_KEYS.split(',');

// Generate pre-signed upload URLs
export const awsUpload = async (
  request: IncomingMessage,
  response: ServerResponse,
  body: { filename: string }
) => {
  const cookies = new Cookies(request, response, { keys });

  // Get the email from the users authentication cookie
  const email = cookies.get('signed-in-user', { signed: true });

  // If the cookie was not set, send a Forbidden status
  if (!email) {
    response.writeHead(403);

    return response.end();
  }

  // Get the extension of the image about to be uploaded
  const ext = body.filename.split('.').pop();

  // Find out if the content type is image/jpeg
  const contentType = mime['getType'](ext);

  // If it is not, throw an error
  if (contentType !== 'image/jpeg') {
    response.writeHead(400);

    return response.end(
      JSON.stringify({
        error: 'Only JPG images are allowed'
      })
    );
  }

  // Generate a unique file name, inside the folder of the users email on S3
  const key = `${email}/${nanoid()}.${ext}`;

  // Generate the URL and meta-data required for the client to POST its image directly to S3
  const upload = s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET,
    Fields: {
      acl: 'public-read',
      contentType,
      key
    }
  });

  response.writeHead(200);

  // Send the URL and meta-data for uploading to the client
  // Also send the link the image can be loaded from after uploading
  response.end(
    JSON.stringify({
      link: `https://s3.eu-central-1.amazonaws.com/${process.env.AWS_BUCKET}/${key}`,
      upload
    })
  );
};

// Save the recipes of the user
export const awsSave = async (
  request: IncomingMessage,
  response: ServerResponse,
  body: Recipe[]
) => {
  const cookies = new Cookies(request, response, { keys });
  const email = cookies.get('signed-in-user', { signed: true });

  // If the cookie of the user was not found, throw a Forbidden error
  if (!email) {
    response.writeHead(403);

    return response.end();
  }

  const Body = JSON.stringify(body);

  // Save the recipes to S3 in an index.json file
  s3.putObject(
    {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${email}/index.json`,
      Body,
      ContentType: 'application/json'
    },
    (error) => {
      if (error) console.log(error);

      response.writeHead(error ? 500 : 200);

      response.end(error ? { error: 'AWS Error' } : Body);
    }
  );
};
