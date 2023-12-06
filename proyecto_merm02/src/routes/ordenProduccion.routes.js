import express from "express";
import {
  getOrdenesProduccion,
  createOrdenProduccion,
  getOrdenProduccionById,
  updateOrdenProduccionById,
  deleteOrdenProduccionById
} from "../controllers/ordenProducion.controller.js";
import authRequire from "../middlewares/validateToken.js";
//import { validateSchema } from '../middlewares/validator.middleware.js'
import { validateSchema } from '../middlewares/validatorOrdenProduccion.middleware.js'
import {Producto, OrdenProduccion} from "../models/ordenProduccion.model.js"
import { ordenProduccionSchema } from "../schemas/ordenProduccion.schema.js"

const ordenProduccionRouter = express.Router();

// GET: Obtener todas las órdenes de producción
ordenProduccionRouter.get("/ordenProduccion", authRequire, getOrdenesProduccion)

// GET: Obtener una orden de producción por ID
ordenProduccionRouter.get(
  "/ordenProduccion/:id",
  authRequire,
  getOrdenProduccionById
)

// POST: Crear una nueva orden de producción
ordenProduccionRouter.post(
  "/ordenProduccion",
  authRequire,
  validateSchema(ordenProduccionSchema),
  createOrdenProduccion
)

// PUT: Actualizar una orden de producción por ID
ordenProduccionRouter.put(
  "/ordenProduccion/:id",
  authRequire,
  validateSchema(ordenProduccionSchema),
  updateOrdenProduccionById
)

// DELETE: Eliminar una orden de producción por ID
ordenProduccionRouter.delete(
  "/ordenProduccion/:id",
  authRequire,
  deleteOrdenProduccionById
)

export default ordenProduccionRouter

