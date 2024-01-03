import mongoose from "mongoose"

// Primero define productoInventarioSchema
const productoInventarioSchema = new mongoose.Schema({
  fechaEntrada: String,
  fechaSalida: String,
  horaEntrada: String,
  horaSalida: String,
  idProducto: Number,
  stock: Number,
  cantidadSalida: Number,
  cantidadRestante: Number,
  plancha: String,
  color: String,
  dibujo: String,
  molde: String,
  acabado: String,
  calibre: String
})

// Luego define inventarioAlmacenSchema, que hace referencia a productoInventarioSchema
const inventarioAlmacenSchema = new mongoose.Schema({
  idInventarioAlmacen: Number,
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
 