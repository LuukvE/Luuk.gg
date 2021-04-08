import mongoose, { Schema, Document } from 'mongoose';

interface IRecipe extends Document {
  cid: string;
  name: string;
  duration: string;
  creator: string;
  difficulty: number;
  image: string;
  text: string;
  created: string;
}

export const Recipe = mongoose.model<IRecipe>(
  'recipe',
  new Schema({
    cid: { type: String, required: true },
    name: { type: String, required: true },
    duration: { type: String, required: true },
    creator: { type: String, required: true },
    difficulty: { type: Number, required: true },
    image: { type: String },
    text: { type: String, required: true },
    created: { type: Date, required: true }
  })
);
