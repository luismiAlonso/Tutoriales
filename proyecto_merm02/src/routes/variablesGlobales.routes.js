import express from 'express';
import { obtenerIndiceValido, actualizarIndice } from '../controllers/indiceInventario.controller';

const inventarioRouter = express.Router();

// GET: Obtener el índice actual para una sección y almacén específicos
inventarioRouter.get('/EntradasInventarioPage/indice/:seccion/:almacen', obtenerIndiceValido);

// PUT: Incrementar y obtener el nuevo índice para una sección y almacén específicos
inventarioRouter.put('/EntradasInventarioPage/indice/:seccion/:almacen', actualizarIndice);

export default inventarioRouter;
