import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFieldConfig
} from 'graphql';
import mongoose, { Schema } from 'mongoose';
import GraphQLDate from './scalars/date';

const User = mongoose.model(
  'user',
  new Schema({
    email: { type: String, unique: true, required: true, dropDups: true },
    name: { type: String, required: true },
    created: { type: Date, required: true },
    picture: { type: String }
  })
);

const userFields = {
  _id: { type: GraphQLString },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  picture: { type: GraphQLString },
  created: { type: GraphQLDate }
};

const UserSchema = new GraphQLObjectType({
  name: 'user',
  fields: userFields
});

export const userQuery: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'userQuery',
    fields: {
      getByEmail: {
        type: UserSchema,
        args: { email: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: (_, fields) => User.findOne(fields)
      },
      getAll: {
        type: new GraphQLList(UserSchema),
        args: userFields,
        resolve: (_, fields) => User.find(fields)
      }
    }
  })
};

export const userMutations: GraphQLFieldConfig<any, any> = {
  resolve: (_, fields) => fields,
  type: new GraphQLObjectType({
    name: 'userMutations',
    fields: {
      create: {
        type: UserSchema,
        args: userFields,
        resolve: (_, fields) => {
          const user = new User({
            ...fields,
            created: new Date()
          });

          return user.save();
        }
      },
      delete: {
        type: UserSchema,
        args: {
          _id: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: (_, { _id }) => User.findOneAndRemove(_id)
      }
    }
  })
};
