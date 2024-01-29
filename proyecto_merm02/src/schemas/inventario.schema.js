import { z } from "zod"

export const productoInventarioSchema = z.object({
  seccion: z.string(),
  almacen: z.string(),
  fechaEntrada: z.string(),
  fechaSalida: z.string(), // Suponiendo que puede ser opcional
  idProducto: z.number(),
  ultimoRegistro:z.boolean(),
  claveComp:z.string(),
  stock: z.number(),
  cantidadSalida: z.number().optional(),
  cantidadEntrante: z.number(),
  plancha: z.string(),
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
