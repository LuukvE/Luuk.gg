import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;

const { VideoGrant } = AccessToken;

export const resolveGet = (_, fields) => {
  // Request to open a WebRTC video sharing room on Twilio
  const videoGrant = new VideoGrant({ room: fields.room });

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_SID,
    process.env.TWILIO_API_SECRET
  );

  token.addGrant(videoGrant);

  // This is a unique string used to know what client is currently connecting
  // This string is generated and saved on the client
  token.identity = fields.identity;

  return {
    token: token.toJwt()
  };
};
