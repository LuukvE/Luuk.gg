import { nanoid } from 'nanoid';
import AWS from 'aws-sdk';
import mime from 'mime';

import { Recipe } from './schemas';

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4'
});

const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

export const resolveGetAll = (_, fields, { cookies }) => {
  const email = cookies.get('signed-in-user', { signed: true });

  if (!email) return [];

  return Recipe.find({ creator: email });
};

export const resolveUploadImage = (_, fields, { cookies }) => {
  const email = cookies.get('signed-in-user', { signed: true });

  if (!email) throw 'You are not signed in';

  // Get the extension of the image about to be uploaded
  const ext = fields.fileName.split('.').pop();

  // Find out if the content type is image/jpeg
  const contentType = mime['getType'](ext);

  // If it is not, throw an error
  if (contentType !== 'image/jpeg') throw 'Only JPG images are allowed';

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

  // Send the URL and meta-data for uploading to the client
  // Also send the link the image can be loaded from after uploading
  return {
    link: `https://s3.eu-central-1.amazonaws.com/${process.env.AWS_BUCKET}/${key}`,
    upload
  };
};

export const resolveSave = async (_, fields, { cookies }) => {
  const email = cookies.get('signed-in-user', { signed: true });

  if (!email) throw 'You are not signed in';

  if (!fields?.recipe?.cid) throw 'Recipe has no CID';

  const recipe = {
    ...fields?.recipe,
    creator: email
  };

  if (recipe.deleted) {
    await Recipe.findOneAndDelete({
      creator: email,
      cid: fields.recipe.cid
    });

    return {
      ...fields.recipe,
      deleted: true
    };
  }

  return Recipe.findOneAndUpdate({ creator: email, cid: fields.recipe.cid }, recipe, {
    upsert: true,
    new: true
  });
};
