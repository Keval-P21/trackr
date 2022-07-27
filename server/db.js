const express = require('express');
const cors = require('cors');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const router = require('./router');
