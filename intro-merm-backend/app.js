const express = require('express');
const bodyParser =require('body-parser')
const productsRoutes = require('./routes/product');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/v1', productsRoutes);

module.exports=app;


