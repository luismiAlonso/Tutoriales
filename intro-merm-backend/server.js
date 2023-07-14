require('dotenv').config();
const express = require('express');
const connectDB = require('./DB/mongodb');
const { appConfig } = require('./config');

const app = express();

app.listen(appConfig.port, () => console.log(`Listening on ${appConfig.port}`));

