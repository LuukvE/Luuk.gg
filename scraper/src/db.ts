import mongoose, { Document, Schema } from 'mongoose';
import dotenv from 'dotenv';
export { Product, Category, Restaurant } from '../../api/src/restaurant/schemas';

dotenv.config();

mongoose.set('useNewUrlParser', true);

mongoose.set('useFindAndModify', false);

mongoose.set('useCreateIndex', true);

mongoose.set('useUnifiedTopology', true);

mongoose.connect(`mongodb://127.0.0.1/${process.env.MONGODB}`);

mongoose.connection.on('error', (err) => console.error('MongoDB Error', err));