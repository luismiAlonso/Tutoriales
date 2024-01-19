export interface InventarioAlmacen {
  seccion: string
  almacen: string
  inventario: ProductoInventario[]
}

export interface ProductoInventario {
  fechaEntrada: string
  fechaSalida: string
  idProducto: number
  ultimoRegistro: boolean
  claveComp: string
  stock: number
  cantidadSalida: number
  cantidadEntrante: number
  plancha: string
  color: string
  dibujo: string
  molde: string
  acabado01: string
  acabado02: string
  calibre: string
}

export interface PrepareDataInventario {
  url: string
  inventarioAlmacen: InventarioAlmacen
}
