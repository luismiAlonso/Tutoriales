// routes/variablesGlobalesRoutes.js
import express from "express"
import {
  getIndice,
  createOrUpdateIndice
} from "../controllers/variablesGlobales.controller.js"

const indicesLocalRouter = express.Router()

// Obtener un índice específico
indicesLocalRouter.get("/indice/:seccion/:almacen", getIndice)

// Crear o actualizar un índice
indicesLocalRouter.put("/indice/:seccion/:almacen", createOrUpdateIndice)

// Agrega más rutas según necesites

export default indicesLocalRouter
