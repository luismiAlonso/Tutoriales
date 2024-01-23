import mongoose from "mongoose";

const indiceInventario = new mongoose.Schema({
    seccion:string,
    almacen:string,
    indice:number
})

export default  indiceInventario = mongoose.model("IndiceInventario",indiceInventario)