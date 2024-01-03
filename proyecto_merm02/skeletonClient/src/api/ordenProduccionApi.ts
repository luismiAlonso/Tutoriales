import axios from "./axios"
import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion"

// Obtener todas las ordenes de producción
export const fetchOrdenesProduccionDB = async (): Promise<
  OrdenProduccion[]
> => {
  try {
    const response = await axios.get<OrdenProduccion[]>("/ordenProduccion")
    return response.data
  } catch (error) {
    console.error("Error fetching ordenes de produccion:", error)
    return []
  }
}

// Guardar todas las ordenes de producción
export const saveOrdenesProduccionDB = async (ordenes: OrdenProduccion[]) => {
  try {
    await axios.put("/ordenProduccion", ordenes)
  } catch (error) {
    console.error("Error saving ordenes de produccion:", error)
  }
}

// Añadir una nueva orden de producción
export const addOrdenProduccionDB = async (orden: OrdenProduccion) => {
  try {
    const response = await axios.post("/ordenProduccion", orden)
    return response
  } catch (error) {
    console.error("Error adding orden de produccion:", error)
  }
}

// Actualizar una orden por ID
export const updateOrdenByIdDB = async (
  idParte: number,
  updatedOrden: Partial<OrdenProduccion>
) => {
  try {

    //console.log(`/ordenProduccion/${idParte}`,updatedOrden)
    const response = await axios.put(
      `/ordenProduccion/${idParte}`,
      updatedOrden
    )

    return response
  } catch (error) {
    console.error("Error updating orden by id:", error)
  }
}

// Actualizar un producto en una orden de producción
export const updateProductInOrdenProduccionDB = async (
  idParte: number,
  idProducto: number,
  updatedProductData: Partial<Producto>
) => {
  try {
    await axios.put(
      `/ordenProduccion/${idParte}/productos/${idProducto}`,
      updatedProductData
    )
  } catch (error) {
    console.error("Error updating producto in orden de producción:", error)
  }
}

interface DeleteResponse {
  success: boolean;
  message?: string;
}

export const deleteProductFromOrdenProduccionDB = async (
  idParte: number, // ID de la orden de producción
  idProducto: number // ID del producto a eliminar
): Promise<DeleteResponse> => {
  try {

    await axios.delete(`/ordenProduccion/${idParte}/productos/${idProducto}`)
    return { success: true, message: "Producto eliminado con éxito" };

  } catch (error) {
    console.error("ERROR",error)
    return { success: false, message: error+""};
  }
}

// Aquí puedes agregar más funciones según lo necesites...
