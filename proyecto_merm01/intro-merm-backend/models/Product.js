const mongoose = require('mongoose');
const { appConfig } = require('../config')
const Schema = mongoose.Schema;

//coleccion / modelo 
const ProductSchema = Schema({
    name: String,
    size: Number,
    unitaryPrice: Number,
    imgUrl: String,
    description: String
}, {
    timestamps: true
})

ProductSchema.methods.setImgUrl = function setImgUrl (filename){
    
    const {host, port} = appConfig;
    this.imgUrl =`${host}:${port}/public/${filename}`
}

//exporta el modelo a la BD, primer parametro Nombre del modelo segundo esquema del modelo
module.exports = mongoose.model('Products',ProductSchema)