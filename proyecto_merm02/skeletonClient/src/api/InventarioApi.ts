import { Route } from "react-router-dom"
import { InventarioAlmacen, ProductoInventario } from "../interfaces/Inventario"
import axios from "./axios"

// Ejemplo de función modificada para obtener un inventario por sección y almacén
export const fetchInventarioAlmacenBySeccionAlmacen = async (
  route: string,
  seccion: string,
  almacen: string
): Promise<InventarioAlmacen | null> => {
  try {
    const response = await axios.get<InventarioAlmacen>(
      `${route}/${seccion}/${almacen}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching inventario by seccion and almacen:", error)
    return null
  }
}

export const deleteInventarioAlmacen = async (
  route: string,
  seccion: string,
  almacen: string
): Promise<boolean> => {
  try {
    await axios.delete(`${route}/${seccion}/${almacen}`)
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
    const response = await axios.post(`${route}`, nuevoInventarioAlmacen)
    console.log(response)
    return true
  } catch (error) {
    console.error("Error adding inventario almacen:", error)
    return false
  }
}

export const updateInventario = async (
  route: string,
  seccion: string,
  almacen: string,
  inventarioAlmacen: InventarioAlmacen
): Promise<boolean> => {
  try {
    await axios.put(`${route}/${seccion}/${almacen}`, inventarioAlmacen)
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

export const updateProductoInInventario = async (
  route: string,
  seccion: string,
  almacen: string,
  updatedProductoData: Partial<ProductoInventario>
): Promise<boolean> => {
  try {
    await axios.put(
      `${route}/${seccion}/${almacen}/producto/${updatedProductoData.idProducto}`,
      updatedProductoData
    )
    return true
  } catch (error) {
    console.error("Error updating producto in inventario:", error)
    return false
  }
}

export const addProductoInventario = async (
  route: string,
  seccion: string,
  almacen: string,
  nuevoProductoInventario: ProductoInventario
): Promise<boolean> => {
  try {
    await axios.post(
      `${route}/${seccion}/${almacen}/producto/${nuevoProductoInventario}`,
      nuevoProductoInventario
    )
    return true
  } catch (error) {
    console.error("Error adding producto inventario to inventario:", error)
    return false
  }
}

// Las demás funciones permanecen iguales
