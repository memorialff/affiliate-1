import { MongoClient } from 'mongodb';

let cachedDb = null;
let cachedClient = null; // Declare the cachedClient variable

export async function connectToDatabase() {
  if (cachedDb && cachedClient) {
    return { db: cachedDb, client: cachedClient };
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(process.env.MONGODB_DB);

  cachedDb = db;
  cachedClient = client; // Cache the client connection

  return { db: cachedDb, client: cachedClient };
}
