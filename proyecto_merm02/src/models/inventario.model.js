import mongoose from "mongoose"

// Primero define productoInventarioSchema
const productoInventarioSchema = new mongoose.Schema({
  seccion: String,
  almacen: String,
  fechaEntrada: String,
  fechaSalida: String,
  idProducto: Number,
  ultimoRegistro:Boolean,
  claveComp:String,
  stock: Number,
  cantidadSalida: Number,
  cantidadEntrante: Number,
  plancha: String,
  color: String,
  dibujo: String,
  molde: String,
  acabado01: String,
  acabado02: String,
  calibre: String
})

// Luego define inventarioAlmacenSchema, que hace referencia a productoInventarioSchema
const inventarioAlmacenSchema = new mongoose.Schema({
  seccion: String,
  almacen: String,
  inventario: [productoInventarioSchema] // Un array de documentos de tipo ProductoInventario
})

// Creación de los modelos
const ProductoInventario = mongoose.model(
  "ProductoInventario",
  productoInventarioSchema
)
const InventarioAlmacen = mongoose.model(
  "InventarioAlmacen",
  inventarioAlmacenSchema
)

// Exportación de los modelos
export { ProductoInventario, InventarioAlmacen }
 