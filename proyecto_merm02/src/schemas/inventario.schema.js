import { z } from "zod"

export const productoInventarioSchema = z.object({
  fechaEntrada: z.string(),
  fechaSalida: z.string(), // Suponiendo que puede ser opcional
  idProducto: z.number(),
  stock: z.number(),
  cantidadSalida: z.number().optional(),
  cantidadEntrante: z.number(),
  planchas: z.string(),
  color: z.string(),
  dibujo: z.string(), // Suponiendo que puede ser opcional
  molde: z.string(),
  acabado01: z.string(),
  acabado02: z.string().optional(),
  calibre: z.string()
})

export const inventarioAlmacenSchema = z.object({
  seccion: z.string(),
  almacen: z.string(),
  inventario: z.array(productoInventarioSchema)
})
