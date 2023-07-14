require('dotenv').config();

const express = require('express');
const connectDB = require('./DB/mongodb');
const { appConfig, db } = require('./config');

const app = express();

connectDB(db);

app.listen(appConfig.port, () => console.log(`Listening on ${appConfig.port}`));

