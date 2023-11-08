export interface OrdenProduccion {
  idParte: number
  TipoGoma: string
  ordenesProduccion: Producto[]
  fecha: string
}

export interface Producto {
  idParte: number
  indiceProducto: number
  operario: number
  Pasada: number
  Tipo: string
  Color: string
  Molde: string
  PlanchaObtenidas: number
  Peso: number
  Formulas: number
  Planchas: number
  Acelerantes: string
}
