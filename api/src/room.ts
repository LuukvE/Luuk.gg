import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFieldConfig } from 'graphql';
import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;

const { VideoGrant } = AccessToken;

const roomFields = {
  token: { type: GraphQLString }
};

const RoomSchema = new GraphQLObjectType({
  name: 'Room',
  fields: roomFields
});

export const roomQuery: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'RoomQuery',
    fields: {
      get: {
        type: RoomSchema,
        args: {
          room: { type: new GraphQLNonNull(GraphQLString) },
          identity: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: (_, fields) => {
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
        }
      }
    }
  })
};
