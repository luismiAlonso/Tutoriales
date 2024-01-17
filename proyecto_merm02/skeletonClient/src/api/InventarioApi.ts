import { Route } from "react-router-dom"
import { InventarioAlmacen, ProductoInventario } from "../interfaces/Inventario"
import axios from "./axios"

// Ejemplo de función modificada para obtener un inventario por sección y almacén
export const fetchInventarioAlmacenBySeccionAlmacen = async (
  route: string
): Promise<InventarioAlmacen | null> => {
  try {
    // console.log(route)
    const response = await axios.get<InventarioAlmacen>(route)
    return response.data
  } catch (error) {
    console.error("Error fetching inventario by seccion and almacen:", error)
    return null
  }
}

export const fetchUltimosProductosBySeccionAlmacen = async (
  route: string,
  tipoFecha: string
): Promise<ProductoInventario[] | null> => {
  try {
    const response = await axios.get<ProductoInventario[]>(
      `${route}/${tipoFecha}`
    )
    return response.data
  } catch (error) {
    console.error(
      "Error al obtener los últimos productos por sección y almacén:",
      error
    )
    return null
  }
}

export const deleteInventarioAlmacen = async (
  route: string
): Promise<boolean> => {
  try {
    await axios.delete(route)
    return true
  } catch (error) {
    console.error("Error deleting inventario almacen:", error)
    return false
  }
}

export const deleteProductoInventario = async (
  route: string,
  idProducto: number
): Promise<boolean> => {
  try {
    await axios.delete(`${route}/${idProducto}`)
    return true
  } catch (error) {
    console.error("Error deleting inventario almacen:", error)
    return false
  }
}

export const agregarInventarioAlmacen = async (
  route: string,
  nuevoInventarioAlmacen: InventarioAlmacen
): Promise<boolean> => {
  try {
    //console.log(nuevoInventarioAlmacen)
    await axios.post(route, nuevoInventarioAlmacen)

    return true
  } catch (error) {
    console.error("Error adding inventario almacen:", error)
    return false
  }
}

export const updateInventario = async (
  route: string,
  inventarioAlmacen: InventarioAlmacen
): Promise<boolean> => {
  try {
    await axios.put(route, inventarioAlmacen)
    return true
  } catch (error) {
    console.error("Error updating inventario:", error)
    return false
  }
}

export const fetchAllInventarioAlmacen = async (
  route: string
): Promise<InventarioAlmacen[]> => {
  try {
    const response = await axios.get<InventarioAlmacen[]>(route)
    return response.data
  } catch (error) {
    console.error("Error fetching all inventario almacen:", error)
    return []
  }
}

//actualizacion de producto
export const updateProductoInInventario = async (
  route: string,
  updatedProductoData: InventarioAlmacen
): Promise<boolean> => {
  try {
    const response = await axios.put(route, updatedProductoData)
    console.log(response)
    return true
  } catch (error) {
    console.error("Error updating producto in inventario:", error)
    return false
  }
}

export const addProductoInventario = async (
  route: string,
  nuevoProductoInventario: ProductoInventario
): Promise<boolean> => {
  try {
    await axios.post(
      `${route}/${nuevoProductoInventario}`,
      nuevoProductoInventario
    )
    return true
  } catch (error) {
    console.error("Error adding producto inventario to inventario:", error)
    return false
  }
}

// Las demás funciones permanecen iguales
