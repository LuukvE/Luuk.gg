import { IncomingMessage, ServerResponse } from 'http';
import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

export default (
  request: IncomingMessage,
  response: ServerResponse,
  body: { room: string; identity: string }
) => {
  response.writeHead(200);

  const videoGrant = new VideoGrant({ room: body.room });

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_SID,
    process.env.TWILIO_API_SECRET
  );

  token.addGrant(videoGrant);

  token.identity = body.identity;

  response.end(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};
