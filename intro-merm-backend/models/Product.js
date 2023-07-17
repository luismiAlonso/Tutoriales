const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//coleccion / modelo 
const ProductSchema = Schema({

    name: String,
    size: Number,
    unitaryPrice: Number,
    imgUrl: String,
    description: String
},{
    timestamps: true
})

//exporta el modelo a la BD, primer parametro Nombre del modelo segundo esquema del modelo
module.exports = mongoose.model('Products',ProductSchema)