import mongoose, { ConnectOptions } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const mongoUrl = process.env.MONGO_URL || '';

if (!mongoUrl) {
  console.error('MONGO_URL is not defined');
  process.exit(1);
}

interface CustomConnectOptions extends ConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  useFindAndModify?: boolean;
}

function initConnection() {
  try {
    const mongoConnection = mongoose.createConnection(
      process.env.MONGO_URL,
      {} as CustomConnectOptions,
    );

    console.log(`Successfully connected to the  database`);
    return mongoConnection;
  } catch (error) {
    console.error(error);
    process.exit(1);
    // Return a rejected promise in case of an error
    throw error;
  }
}

const connection = initConnection();

export default connection;
