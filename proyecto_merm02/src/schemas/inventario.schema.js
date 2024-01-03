import { z } from "zod"

export const productoInventarioSchema = z.object({
  fechaEntrada: z.string(),
  fechaSalida: z.string().optional(), // Suponiendo que puede ser opcional
  horaEntrada: z.string(),
  horaSalida: z.string().optional(), // Suponiendo que puede ser opcional
  idProducto: z.number(),
  stock: z.number(),
  cantidadSalida: z.number(),
  cantidadRestante: z.number(),
  plancha: z.string(),
  color: z.string(),
  dibujo: z.string().optional(), // Suponiendo que puede ser opcional
  molde: z.string(),
  acabado: z.string(),
  calibre: z.string()
})

export const inventarioAlmacenSchema = z.object({
  idInventarioAlmacen: z.number(),
  seccion: z.string(),
  almacen: z.string(),
  inventario: z.array(productoInventarioSchema)
})
