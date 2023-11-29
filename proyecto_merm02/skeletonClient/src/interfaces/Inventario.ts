export interface InventarioAlmacen {
  idInventarioAlmacen: number
  nombreAlmacen: string,
  gestionadoPor: string,
  inventarios: Inventario[]
}

export interface Inventario {
    idInventario:number,
    fechaEntrada:string,
    fechaSalida:string,
    horaEntrada:string,
    horaSalida:string,
    listaProductos:ProductoInventario[]
}

export interface ProductoInventario {
    idProducto:string,
    indiceProducto:number,
    stock:number,
    cantidadSalida:number,
    cantidadRestante:number
}
