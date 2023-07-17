const express = require('express');
const productsRoutes = require('./routes/product');

const app = express();

app.use('/v1', productsRoutes);

module.exports=app;


