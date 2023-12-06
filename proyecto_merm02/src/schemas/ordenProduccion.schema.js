import { z } from "zod"

 export const productoSchema = z.object({
  idParte: z.number(),
  fecha: z.string(),
  indiceProducto: z.number(),
  operario: z.number(),
  pasada: z.number(),
  tipoGoma: z.string(),
  tipo: z.string(),
  color: z.string(),
  molde: z.string(),
  planchaobtenidas: z.number(),
  peso: z.number(),
  formulas: z.number(),
  planchas: z.number(),
  acelerantes: z.string()
})

export const ordenProduccionSchema = z.object({
  idParte: z.number(),
  TipoGoma: z.string(),
  ordenesProduccion: z.array(productoSchema),
  fecha: z.string(),
  createdAt: z.string().optional(), 
  updatedAt: z.string().optional()
})
