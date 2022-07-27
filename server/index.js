const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router');
require('dotenv').config();
const { main } = require('./db');

const SERVER_PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('Sorry, not found!');
});

main().then(
  app.listen(SERVER_PORT, (err) => {
    if (err) {
      console.log(`Server is listening on port ${SERVER_PORT}!`);
    } else {
      console.log(`Server is listening on port ${SERVER_PORT}!`);
    }
  })
);
