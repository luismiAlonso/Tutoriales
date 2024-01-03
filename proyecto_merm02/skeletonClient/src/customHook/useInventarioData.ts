import { useState } from "react"
import {
  agregarInventarioAlmacen,
  fetchAllInventarioAlmacen
} from "../api/InventarioApi"
import { InventarioAlmacen, ProductoInventario } from "../interfaces/Inventario"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { HeaderInventario } from "../models/HeaderInventario"

export const useInventarioData = () => {
  const [productoInicial, setProductoInicial] = useState<ColumnDescriptor[]>(HeaderInventario)
  const [currentInventario, setCurrentInventari] = useState<InventarioAlmacen>()

  const getUltimoInventarioAlmacen =
    async (): Promise<InventarioAlmacen | null> => {

      try {

        const todosInventariosAlmacen = await fetchAllInventarioAlmacen(
          "/EntradasInventarioPage"
        )

        if (todosInventariosAlmacen && todosInventariosAlmacen.length > 0) {
          return todosInventariosAlmacen[todosInventariosAlmacen.length - 1]
        } else {
          return null
        }
      } catch (error) {
        console.error("Error al obtener el último inventario almacén:", error)
        return null
      }
    }

  const crearNuevoInventario = (
    route: string,
    almacen: string,
    seccion: string
  ): void => {
    const response = getUltimoInventarioAlmacen()
    let idInventarioAlmacen = 1
    response.then((result) => {
      if (result) {
        idInventarioAlmacen = result.idInventarioAlmacen+1
      }
      const nuevoInventarioAlmacen = {
        idInventarioAlmacen,
        seccion,
        almacen: almacen,
        inventario: []
      } as InventarioAlmacen

      setCurrentInventari(nuevoInventarioAlmacen)
      agregarInventarioAlmacen(route, nuevoInventarioAlmacen).then((result) => {
        console.log(result)
      })
    }) 
  }

  
  const agregarNuevaEntrada = (EntradaProNuevo: ProductoInventario) => {
    if (currentInventario) {
      currentInventario.inventario.push(EntradaProNuevo)
    }

    //console.log(EntradaProNuevo)
  }
  

  return {
    getUltimoInventarioAlmacen,
    crearNuevoInventario,
    agregarNuevaEntrada,
    currentInventario,
    productoInicial
  }
}
