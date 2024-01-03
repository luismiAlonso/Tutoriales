import { Route } from "react-router-dom"
import { InventarioAlmacen, ProductoInventario } from "../interfaces/Inventario"
import axios from "./axios"

export const fetchInventarioAlmacenById = async (
  route: string,
  id: number
): Promise<InventarioAlmacen | null> => {
  try {
    const response = await axios.get<InventarioAlmacen>(`${route}/${id}`)
    return response.data
  } catch (error) {
    console.error("Error fetching inventario almacen by id:", error)
    return null
  }
}

export const deleteInventarioAlmacen = async (
  route: string,
  id: number
): Promise<boolean> => {
  try {
    await axios.delete(`${route}/${id}`)
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
  inventarioAlmacen: InventarioAlmacen
): Promise<boolean> => {
  try {
    await axios.put(
      `${route}/${inventarioAlmacen.idInventarioAlmacen}`,
      inventarioAlmacen
    )
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
  idInventario: number,
  idProducto: string,
  updatedProductoData: Partial<ProductoInventario>
): Promise<boolean> => {
  try {
    await axios.put(
      `${route}/${idInventario}/productos/${idProducto}`,
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
  idInventario: number,
  nuevoProductoInventario: ProductoInventario
): Promise<boolean> => {
  try {
    await axios.post(
      `${route}/${idInventario}/productos`,
      nuevoProductoInventario
    )
    return true
  } catch (error) {
    console.error("Error adding producto inventario to inventario:", error)
    return false
  }
}

// Las demás funciones permanecen iguales
