import { z } from "zod"

// Definición del esquema de IndiceInventario
const indiceInventarioSchema = z.object({
  seccion: z.string(),
  almacen: z.string(),
  indiceInventario: z.number() // Campo para el contador incremental
})

export default indiceInventarioSchema
