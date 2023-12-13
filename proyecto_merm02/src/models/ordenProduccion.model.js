import mongoose from "mongoose"

const productoSchema = new mongoose.Schema({
  idParte: Number,
  fecha: String,
  bamburi: String,
  indiceProducto: Number,
  operario: Number,
  pasada: Number,
  tipoGoma: String,
  tipo: String,
  color: String,
  molde: String,
  planchaobtenidas: String,
  peso: Number,
  formulas: Number,
  planchas: Number,
  acelerantes: String
})

const ordenProduccionSchema = new mongoose.Schema(
  {
    idParte: Number,
    TipoGoma: String,
    bamburi: String,
    ordenesProduccion: [productoSchema], // Un array de documentos de tipo Producto
    fecha: String
  },
  {
    timestamps: true
  }
)

const Producto = mongoose.model("Producto", productoSchema)
const OrdenProduccion = mongoose.model("OrdenProduccion", ordenProduccionSchema)

export { Producto, OrdenProduccion }
