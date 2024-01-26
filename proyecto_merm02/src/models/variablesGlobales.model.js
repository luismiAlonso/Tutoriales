import mongoose from "mongoose";

const indiceInventarioSchema = new mongoose.Schema({
    seccion:String,
    almacen:String,
    indice:Number
})

const IndiceInventario = mongoose.model("IndiceInventario",indiceInventarioSchema)
export default IndiceInventario;
