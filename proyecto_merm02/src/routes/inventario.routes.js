import express from "express"
import {
  getAllInventarioAlmacen,
  createInventarioAlmacen,
  getInventarioAlmacenBySeccionAlmacen,
  updateInventarioAlmacenBySeccionAlmacen,
  deleteInventarioAlmacenBySeccionAlmacen,
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

// DELETE: Eliminar un inventario de almacén por sección y almacén
inventarioRouter.delete(
  "/EntradasInventarioPage/:seccion/:almacen",
  authRequire,
  deleteInventarioAlmacenBySeccionAlmacen
)

// ...más rutas adaptadas según sea necesario

/*
// GET: Obtener todos los inventarios de almacén
inventarioRouter.get("/EntradasInventarioPage", authRequire, getAllInventarioAlmacen)

// GET: Obtener un inventario de almacén por ID
inventarioRouter.get(
  "/EntradasInventarioPage/:idInventarioAlmacen",
  authRequire,
  getInventarioAlmacenById
)

// POST: Crear un nuevo inventario de almacén
inventarioRouter.post(
  "/EntradasInventarioPage/:idInventarioAlmacen",
  authRequire,
  validatorInventario(inventarioAlmacenSchema),
  createInventarioAlmacen
)

// PUT: Actualizar un inventario de almacén por ID
inventarioRouter.put(
  "/EntradasInventarioPage/:idInventarioAlmacen",
  authRequire,
  validatorInventario(inventarioAlmacenSchema),
  updateInventarioAlmacenById
)

// DELETE: Eliminar un inventario de almacén por ID
inventarioRouter.delete(
  "/EntradasInventarioPage/:idInventarioAlmacen",
  authRequire,
  deleteInventarioAlmacenById
)

// PUT: Actualizar un producto en un inventario de almacén
inventarioRouter.put(
  "/EntradasInventarioPage/:idInventarioAlmacen/productos/:idProducto",
  authRequire,
  validatorInventario(inventarioAlmacenSchema),
  updateProductoInInventarioById
)

// POST: Agregar un producto a un inventario de almacén
inventarioRouter.post(
  "/EntradasInventarioPage/:idInventarioAlmacen/productos",
  authRequire,
  validatorInventario(inventarioAlmacenSchema),
  addProductoInventarioToInventario
)*/

// ...más rutas según sea necesario

export default inventarioRouter
