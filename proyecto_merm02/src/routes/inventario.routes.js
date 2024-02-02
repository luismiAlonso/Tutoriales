import express from "express"
import {
  getAllInventarioAlmacen,
  createInventarioAlmacen,
  getUltimosProductosPorClave,
  getUltimosProductosPorUltimoRegistro,
  getTodosUltimosPorClave,
  deleteProductoInventarioById,
  deleteProductosInventarioPorClaveComp,
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

inventarioRouter.get(
  "/ListadoInventario",
  authRequire,
  getAllInventarioAlmacen
)
// GET: Obtener un inventario de almacén por sección y almacén
inventarioRouter.get(
  "/EntradasInventarioPage/:seccion/:almacen",
  authRequire,
  getInventarioAlmacenBySeccionAlmacen
)

inventarioRouter.get(
  "/EntradasInventarioPage/:seccion/:almacen/:tipoFecha",
  authRequire,
  getUltimosProductosPorClave
)

inventarioRouter.get(
  "/EntradasInventarioPage/:seccion/:almacen/ultimoRegistro",
  authRequire,
  getUltimosProductosPorUltimoRegistro
)

inventarioRouter.get(
  "/EntradasInventarioPage/ultimoRegistro",
  authRequire,
  getTodosUltimosPorClave
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

//DELETE: eliminar linea de inventario en un inventario especifico
inventarioRouter.delete(
  "/EntradasInventarioPage/:seccion/:almacen/completo/:claveComp",
  deleteProductosInventarioPorClaveComp
)

// ...más rutas según sea necesario

export default inventarioRouter
