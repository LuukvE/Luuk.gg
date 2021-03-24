import { IncomingMessage, ServerResponse } from 'http';
import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

export default (
  request: IncomingMessage,
  response: ServerResponse,
  body: { room: string; identity: string }
) => {
  // Request to open a WebRTC video sharing room on Twilio
  const videoGrant = new VideoGrant({ room: body.room });

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_SID,
    process.env.TWILIO_API_SECRET
  );

  token.addGrant(videoGrant);

  // This is a unique string used to know what client is currently connecting
  // This string is generated and saved on the client
  token.identity = body.identity;

  response.writeHead(200);

  // Send the JSON Web Token used by the Twilio client-side library "twilio-video"
  response.end(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};
