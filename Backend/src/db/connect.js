/**
 * src/db/connect.js — Mongoose connection to MongoDB Atlas
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>')) {
    console.error('\n❌  MONGODB_URI is not set in your .env file.');
    console.error('   Open Backend/.env and replace the placeholder with your Atlas connection string.\n');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅  MongoDB Atlas connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌  MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
