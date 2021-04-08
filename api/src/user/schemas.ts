import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  name: string;
  created: Date;
  picture: string;
}

export const User = mongoose.model<IUser>(
  'user',
  new Schema({
    email: { type: String, unique: true, required: true, dropDups: true },
    name: { type: String, required: true },
    created: { type: Date, required: true },
    picture: { type: String }
  })
);
