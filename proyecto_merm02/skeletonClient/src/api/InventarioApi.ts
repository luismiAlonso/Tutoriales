import {
  InventarioAlmacen,
  Inventario,
  ProductoInventario
} from "../interfaces/Inventario"

// Obtener todos los elementos
export const obtenerTodos = <T>(clave: string): T[] => {
  const items = localStorage.getItem(clave)
  return items ? JSON.parse(items) : []
}

// Obtener un elemento por su ID
export const obtenerPorId = <T>(
  clave: string,
  id: number | string,
  idField: keyof T
): T | undefined => {
  const items: T[] = obtenerTodos(clave)
  return items.find((item) => item[idField] === id)
}

// Crear un nuevo elemento
export const crear = <T>(clave: string, item: T): void => {
  const items: T[] = obtenerTodos(clave)
  items.push(item)
  localStorage.setItem(clave, JSON.stringify(items))
}

// Actualizar un elemento existente
export const actualizar = <T>(
  clave: string,
  item: T,
  idField: keyof T
): void => {
  const items: T[] = obtenerTodos(clave)
  const index = items.findIndex((i) => i[idField] === item[idField])
  if (index !== -1) {
    items[index] = item
    localStorage.setItem(clave, JSON.stringify(items))
  }
}

// Eliminar un elemento
export const eliminar = <T>(
  clave: string,
  id: number | string,
  idField: keyof T
): void => {
  const items: T[] = obtenerTodos(clave)
  const newItems = items.filter((item) => item[idField] !== id)
  localStorage.setItem(clave, JSON.stringify(newItems))
}

// Funciones específicas para cada tipo de objeto, usando los nombres correctos de campos ID
export const obtenerInventarioAlmacenPorId = (
  id: number
): InventarioAlmacen | undefined =>
  obtenerPorId<InventarioAlmacen>(
    "inventarioAlmacen",
    id,
    "idInventarioAlmacen"
  )
export const actualizarInventarioAlmacen = (
  inventarioAlmacen: InventarioAlmacen
): void =>
  actualizar("inventarioAlmacen", inventarioAlmacen, "idInventarioAlmacen")
export const eliminarInventarioAlmacen = (id: number): void =>
  eliminar("inventarioAlmacen", id, "idInventarioAlmacen")

export const obtenerInventarioPorId = (id: number): Inventario | undefined =>
  obtenerPorId<Inventario>("inventario", id, "idInventario")
export const actualizarInventario = (inventario: Inventario): void =>
  actualizar("inventario", inventario, "idInventario")
export const eliminarInventario = (id: number): void =>
  eliminar("inventario", id, "idInventario")

export const obtenerProductoInventarioPorId = (
  id: string
): ProductoInventario | undefined =>
  obtenerPorId<ProductoInventario>("productoInventario", id, "idProducto")
export const actualizarProductoInventario = (
  productoInventario: ProductoInventario
): void => actualizar("productoInventario", productoInventario, "idProducto")
export const eliminarProductoInventario = (id: string): void =>
  eliminar("productoInventario", id, "idProducto")

//Obtrinen todos los almacenesInventario
export const obtenerTodosInventarioAlmacen = (): InventarioAlmacen[] =>
  obtenerTodos<InventarioAlmacen>("inventarioAlmacen")

// Funciones específicas para Inventario
export const obtenerTodosInventarios = (
  idInventarioAlmacen: number
): Inventario[] => {
  const inventarioAlmacen = obtenerInventarioAlmacenPorId(idInventarioAlmacen)
  if (inventarioAlmacen) {
    return inventarioAlmacen.inventarios
  }
  return []
}

//Agregaciones
// Agregar un nuevo InventarioAlmacen
export const agregarInventarioAlmacen = (
  nuevoInventarioAlmacen: InventarioAlmacen
): void => {
  crear("inventarioAlmacen", nuevoInventarioAlmacen)
}

// Agregar un Inventario a un InventarioAlmacen existente
export const agregarInventarioAInventarioAlmacen = (
  idInventarioAlmacen: number,
  nuevoInventario: Inventario
): void => {
  const inventarioAlmacen = obtenerInventarioAlmacenPorId(idInventarioAlmacen)
  if (inventarioAlmacen) {
    inventarioAlmacen.inventarios.push(nuevoInventario)
    actualizarInventarioAlmacen(inventarioAlmacen)
  }
}

// Agregar un ProductoInventario a un Inventario existente
export const agregarProductoInventarioAInventario = (
  idInventario: number,
  nuevoProductoInventario: ProductoInventario
): void => {
  const todosLosInventariosAlmacen: InventarioAlmacen[] =
    obtenerTodosInventarioAlmacen()
  todosLosInventariosAlmacen.forEach((almacen) => {
    const inventario = almacen.inventarios.find(
      (inv) => inv.idInventario === idInventario
    )
    if (inventario) {
      inventario.listaProductos.push(nuevoProductoInventario)
      actualizarInventarioAlmacen(almacen)
    }
  })
}

// Las demás funciones permanecen iguales
