const mongoose = require('mongoose');

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB error', error);
  }
};

module.exports = { main };
