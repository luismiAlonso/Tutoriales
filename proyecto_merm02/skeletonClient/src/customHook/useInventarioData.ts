import {
  agregarInventarioAlmacen,
  obtenerTodosInventarioAlmacen
} from "../api/InventarioApi"
import { InventarioAlmacen } from "../interfaces/Inventario"

export const useInventarioData = () => {
  const getUltimoInventarioAlmacen = (): InventarioAlmacen | undefined => {
    const todosInventariosAlmacen = obtenerTodosInventarioAlmacen()
    if (todosInventariosAlmacen && todosInventariosAlmacen.length > 0) {
      return todosInventariosAlmacen[todosInventariosAlmacen.length - 1]
    }
    return undefined
  }

  const cargarDatosNuevoInventario = (
    gestor: string,
    nombreAlmacen: string
  ): void => {
    
    const ultimoInventarioAlmacen = getUltimoInventarioAlmacen()
    let idInventarioAlmacen = 1

    if (ultimoInventarioAlmacen) {
      idInventarioAlmacen = ultimoInventarioAlmacen.idInventarioAlmacen + 1
    }

    const nuevoInventarioAlmacen = {
      idInventarioAlmacen,
      nombreAlmacen,
      gestionadoPor: gestor,
      inventarios: []
    } as InventarioAlmacen

    agregarInventarioAlmacen(nuevoInventarioAlmacen)
  }

  return { getUltimoInventarioAlmacen, cargarDatosNuevoInventario }
}
