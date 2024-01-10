import express from "express"
import {
  getAllInventarioAlmacen,
  createInventarioAlmacen,
  deleteProductoInventarioById,
  updateInventarioAlmacenProduct,
  getInventarioAlmacenBySeccionAlmacen,
  updateInventarioAlmacenBySeccionAlmacen,
  deleteInventarioAlmacenBySeccionAlmacen
  // ...otros controladores que puedas necesitar
} from "../controllers/inventario.controller.js"
import authRequire from "../middlewares/validateToken.js"
import { validatorInventario } from "../middlewares/validatorInventario.middleware.js"
import { inventarioAlmacenSchema } from "../schemas/inventario.schema.js"

const inventarioRouter = express.Router()

// GET: Obtener un inventario de almacén por sección y almacén
inventarioRouter.get(
  "/EntradasInventarioPage/:seccion/:almacen",
  authRequire,
  getInventarioAlmacenBySeccionAlmacen
)

// POST: Crear un nuevo inventario de almacén
inventarioRouter.post(
  "/EntradasInventarioPage/:seccion/:almacen",
  authRequire,
  validatorInventario(inventarioAlmacenSchema),
  createInventarioAlmacen
)

// PUT: Actualizar un inventario de almacén por sección y almacén
inventarioRouter.put(
  "/EntradasInventarioPage/:seccion/:almacen",
  authRequire,
  validatorInventario(inventarioAlmacenSchema),
  updateInventarioAlmacenBySeccionAlmacen
)

// PUT: Actualizar un inventario de almacén por sección y almacén
inventarioRouter.put(
  "/EntradasInventarioPage/:seccion/:almacen/:idProducto",
  authRequire,
  updateInventarioAlmacenProduct
)

// DELETE: Eliminar un inventario de almacén por sección y almacén
inventarioRouter.delete(
  "/EntradasInventarioPage/:seccion/:almacen",
  authRequire,
  deleteInventarioAlmacenBySeccionAlmacen
)

//DELETE: eliminar linea de inventario en un inventario especifico
inventarioRouter.delete(
  "/EntradasInventarioPage/:seccion/:almacen/:idProducto",
  deleteProductoInventarioById
)

// ...más rutas según sea necesario

export default inventarioRouter
