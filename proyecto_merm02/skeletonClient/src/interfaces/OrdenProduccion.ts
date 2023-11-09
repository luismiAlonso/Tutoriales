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
  pasada: number
  tipo: string
  color: string
  molde: string
  planchaObtenidas: number
  peso: number
  formulas: number
  planchas: number
  acelerantes: string
}
