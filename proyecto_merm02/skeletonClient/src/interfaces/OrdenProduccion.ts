export interface OrdenProduccion {
  idParte: number
  TipoGoma: string,
  bamburi: string,
  ordenesProduccion: Producto[]
  fecha: string
}

export interface Producto {
  idParte: number
  bamburi: string
  fecha: string
  indiceProducto: number
  operario: number
  pasada: number
  tipoGoma:string
  tipo: string
  color: string
  molde: string
  planchaobtenidas: number
  peso: number
  formulas: number
  planchas: number
  acelerantes: string
}
