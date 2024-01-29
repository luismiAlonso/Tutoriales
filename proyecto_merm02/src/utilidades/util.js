
export const generadorClaveCompuesta = (producto) => {
    const compClave = `${producto.seccion}-${producto.almacen}-${producto.plancha}-${producto.molde}-${producto.dibujo}-${producto.color}-${producto.calibre}-${producto.acabado01}-${producto.acabado02}`
    return compClave
}