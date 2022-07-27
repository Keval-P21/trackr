const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const main = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB error', error);
  }
};

module.exports = { main };
