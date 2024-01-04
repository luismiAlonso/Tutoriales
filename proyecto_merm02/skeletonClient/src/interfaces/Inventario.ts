export interface InventarioAlmacen {
  seccion: string,
  almacen: string,
  inventario: ProductoInventario[]
}

export interface ProductoInventario {
    fechaEntrada:string,
    fechaSalida:string,
    horaEntrada:string,
    horaSalida:string,
    idProducto:number,
    stock:number,
    cantidadSalida:number,
    cantidadEntrante:number,
    plancha:string,
    color:string,
    dibujo:string,
    molde:string,
    acabado:string,
    calibre:string
}
