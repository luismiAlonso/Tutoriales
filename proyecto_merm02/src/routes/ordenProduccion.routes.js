import { Router } from "express"
import {
  getOrdenesProduccion,
  createOrdenProduccion,
  getOrdenProduccionById,
  updateOrdenProduccionById,
  deleteOrdenProduccionById
} from "../controllers/ordenProducion.controller.js"
import { authRequire } from "../middlewares/validateToken.js"
// Importa cualquier otro middleware que necesites, como validación de esquemas

const ordenProduccionRouter = Router()

ordenProduccionRouter.get("/ordenProduccion", authRequire, getOrdenesProduccion)

ordenProduccionRouter.get(
  "/ordenProduccion/:id",
  authRequire,
  getOrdenProduccionById
)

ordenProduccionRouter.post(
  "/ordenProduccion",
  authRequire,
  createOrdenProduccion
)

ordenProduccionRouter.put(
  "/ordenProduccion/:id",
  authRequire,
  updateOrdenProduccionById
)

ordenProduccionRouter.delete(
  "/ordenProduccion/:id",
  authRequire,
  deleteOrdenProduccionById
)

export default ordenProduccionRouter
