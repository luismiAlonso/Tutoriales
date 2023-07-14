require('dotenv').config();
const express = require('express');
const config = require('./config');

const app = express();

app.listen(config.app.port, () => console.log(`Listening on ${config.app.port}`));

