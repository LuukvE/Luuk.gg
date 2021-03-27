import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { IncomingMessage, ServerResponse } from 'http';
import mongoose, { Schema } from 'mongoose';

const vehicle = mongoose.model(
  'vehicle',
  new Schema({
    carname: String,
    year: Number,
    transmission: String,
    fuelType: String,
    engineCapacity: Number
  })
);

const VehicleSchema = new GraphQLObjectType({
  name: 'vehicle',
  description: 'a vehicle to be sold',
  fields: {
    _id: { type: GraphQLString },
    carname: { type: GraphQLString },
    year: { type: GraphQLInt },
    transmission: { type: GraphQLString },
    fuelType: { type: GraphQLString },
    engineCapacity: { type: GraphQLInt }
  }
});

const query = new GraphQLObjectType({
  name: 'vehicleQuery',
  fields: {
    vehicle: {
      type: new GraphQLList(VehicleSchema),
      args: {
        _id: { type: GraphQLString },
        carname: { type: GraphQLString }
      },
      resolve: (_, { _id, carname }) => {
        let where;
        if (_id) {
          where = { _id: _id };
        } else if (carname) {
          where = { carname: carname };
        } else {
          where = {};
        }
        return vehicle.find(where);
      }
    },
    getByCapacity: {
      type: new GraphQLList(VehicleSchema),
      args: {
        capacity: { type: GraphQLInt }
      },
      resolve: (_, { capacity }) =>
        vehicle.find(capacity ? { engineCapacity: { $lt: capacity } } : {})
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'vehicleMutations',
  fields: {
    create: {
      type: VehicleSchema,
      args: {
        carname: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        transmission: { type: new GraphQLNonNull(GraphQLString) },
        fuelType: { type: new GraphQLNonNull(GraphQLString) },
        engineCapacity: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (_, { carname, year, transmission, fuelType, engineCapacity }) => {
        const v = new vehicle({ carname, year, transmission, fuelType, engineCapacity });

        return v.save();
      }
    },
    delete: {
      type: VehicleSchema,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { _id }) => vehicle.findOneAndRemove(_id)
    }
  }
});

const schema = new GraphQLSchema({
  query,
  mutation
});

mongoose.set('useNewUrlParser', true);

mongoose.set('useFindAndModify', false);

mongoose.set('useCreateIndex', true);

mongoose.set('useUnifiedTopology', true);

mongoose.connect(`mongodb://127.0.0.1/vehicledb`);

mongoose.connection.on('error', (err) => console.error('MongoDB Error', err));

mongoose.connection.once('open', () => console.log('DB connected'));

export default async (
  request: IncomingMessage,
  response: ServerResponse,
  body: { query: string } | null
) => {
  graphql(schema, body?.query || '').then((result) => {
    response.writeHead(200);

    response.end(JSON.stringify(result));
  });
};
