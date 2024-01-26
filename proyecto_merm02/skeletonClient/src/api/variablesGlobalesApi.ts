import axios from "../axiosConfig"



export const obtenerIndiceActualAlmacen = async (
  route: string
): Promise<number | null> => {
  try {
    const response = await axios.get<number>(route)
    return response.data
  } catch (error) {
    console.error("Error al obtener el índice de inventario:", error)
    return null
  }
}

export const crearIndiceAlmacen = async (
  route: string
): Promise<number | null> => {
  try {
    const response = await axios.put<number>(route)
    return response.data
  } catch (error) {
    console.log(route)
    console.error("Error al actualizar el índice de inventario:", error)
    return null
  }
}
