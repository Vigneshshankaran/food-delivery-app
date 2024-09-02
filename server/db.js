const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL

// Establishing the connection with options for better control and stability
mongoose.connect(mongoURL, {});

const db = mongoose.connection;

db.on('connected', () => {
  console.log("Successfully connected to MongoDB");
});

db.on("error", (err) => {
  console.error(`MongoDB, connection error: ${err.message}`);
});

db.on('disconnected', () => {
  console.log("MongoDB connection disconnected");
});

// Handle process termination
process.on('SIGINT', async () => {
  await db.close();
  console.log('MongoDB connection closed due to application termination');
  process.exit(0);
});

module.exports = mongoose;
