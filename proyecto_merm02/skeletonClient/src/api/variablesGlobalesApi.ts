import axios from "axios"

interface IndiceInventarioResponse {
  indice: number
}

export const obtenerIndiceActual = async (
  seccion: string,
  almacen: string
): Promise<number | null> => {
  try {
    const response = await axios.get<IndiceInventarioResponse>(
      `/EntradasInventarioPage/indice/${seccion}/${almacen}`
    )
    return response.data.indice
  } catch (error) {
    console.error("Error al obtener el índice de inventario:", error)
    return null
  }
}

export const actualizarIndiceInventario = async (
  seccion: string,
  almacen: string
): Promise<number | null> => {
  try {
    const response = await axios.put<IndiceInventarioResponse>(
      `/EntradasInventarioPage/indice/${seccion}/${almacen}`
    )
    return response.data.indice
  } catch (error) {
    console.error("Error al actualizar el índice de inventario:", error)
    return null
  }
}
