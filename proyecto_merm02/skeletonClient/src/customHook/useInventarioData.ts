import { useState } from "react"
import {
  agregarInventarioAlmacen,
  fetchInventarioAlmacenBySeccionAlmacen,
  deleteInventarioAlmacen,
  deleteProductoInventario,
  updateInventario,
  updateProductoInInventario,
  fetchAllInventarioAlmacen,
  addProductoInventario
} from "../api/InventarioApi"
import { InventarioAlmacen, ProductoInventario } from "../interfaces/Inventario"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { productoInventarioInicial } from "../models/productoInventarioInicial"
import id from "date-fns/esm/locale/id/index.js"

export const useInventarioData = () => {
  // console.log("luego de ser seteado",HeaderInventario)
  const [currentInventario, setCurrentInventari] = useState<InventarioAlmacen>()

  const getInventarioSelected = async (
    route: string
  ): Promise<InventarioAlmacen | null> => {
    try {
      const inventario = await fetchInventarioAlmacenBySeccionAlmacen(route)

      if (inventario) {
        // Aquí puedes procesar el inventario si es necesario
        return inventario
      } else {
        // Manejar el caso en que no se encuentre el inventario
        console.log(
          "Inventario no encontrado para la sección y almacén especificados"
        )
        return null
      }
    } catch (error) {
      console.error("Error al obtener el inventario:", error)
      return null
    }
  }

  const deleteLineaInventario = async (
    route: string,
    idProducto: number
  ): Promise<boolean> => {
    try {
      const response = await deleteProductoInventario(route, idProducto)
      return response // Esto será true o false dependiendo de la respuesta de la API
    } catch (error) {
      console.error("Error al eliminar producto del inventario:", error)
      return false
    }
  }

  const crearNuevoInventario = async (
    route: string,
    nuevoInventario: InventarioAlmacen
  ): Promise<boolean> => {
    try {
      const response = await agregarInventarioAlmacen(route, nuevoInventario)
      setCurrentInventari(nuevoInventario)
      return response // response ya es un booleano que indica el éxito o fracaso
    } catch (error) {
      console.error("Error al crear nuevo inventario:", error)
      return false // Devolver false en caso de error
    }
  }

  const updateProductoIventario = async (
    url: string,
    productoInventario: InventarioAlmacen
  ): Promise<boolean> => {
    try {
      //console.log(url)
      const response = await updateProductoInInventario(url, productoInventario)
      return response
    } catch (error) {
      return false
    }
  }

  const mapColumnDescriptorsToProductoInventario = (
    columns: ColumnDescriptor[],
    exclude: string[] = [] // Array de propiedades a excluir
  ): ProductoInventario => {
    const producto: any = {}

    /*cantidadSalida:number,
    cantidadEntrante:number,*/

    columns.forEach((col) => {
      if (
        col.idInput &&
        col.value !== undefined &&
        !exclude.includes(col.idInput)
      ) {
        const key = col.idInput
        //parseo de tipos numericos

        if (
          key === "idProducto" ||
          key === "stock" ||
          key === "cantidadSalida" ||
          key === "cantidadEntrante"
        ) {
          // Convierte a número
          producto[key] = Number(col.value)
        } else {
          // Mantiene como cadena
          producto[key] = col.value
        }
      }
    })

    return producto as ProductoInventario
  }

  const updateColumnDescriptor = (
    datosActuales: ColumnDescriptor[],
    id: string | number,
    valor: string | number,
    plantilla: ColumnDescriptor[]
  ) => {
    if (datosActuales !== null) {
      // Si los datos existen, busca el descriptor de columna específico por idInput
      const index = datosActuales.findIndex((columna) => columna.idInput === id)

      if (index !== -1) {
        // Si se encontró el descriptor de columna, actualiza su valor
        datosActuales[index] = {
          ...datosActuales[index],
          value: valor
        }
        // Luego guarda los datos actualizados de vuelta en localStorage
        //guardarDatosTemporales(datosActuales)
        return datosActuales
      } else {
        console.error(
          `No se encontró el descriptor de columna con idInput: ${id}`
        )
      }
    } else {
      // console.log(plantilla)
      // Si no hay datos en localStorage, busca en la plantilla
      const index = plantilla.findIndex((columna) => columna.idInput === id)

      if (index !== -1) {
        // Si se encontró el descriptor de columna en la plantilla, actualiza su valor
        plantilla[index] = {
          ...plantilla[index],
          value: valor
        }

        // Guarda los datos actualizados de vuelta en localStorage
        // guardarDatosTemporales(plantilla)
        return plantilla
      } else {
        console.error(
          `No se encontró el descriptor de columna con idInput: ${id}`
        )
        // Puedes descomentar la siguiente línea si deseas mostrar este mensaje
        // console.error("No hay datos en localStorage para actualizar.");
      }
    }
  }

  const mapearProductoInventarioAColumnas = (
    columnasTemplate: ColumnDescriptor[],
    producto: ProductoInventario
  ): ColumnDescriptor[] => {
    return columnasTemplate.map((column) => {
      // Convertimos el título a lowercase y buscamos si ese valor existe en el objeto Producto
      const productoKey = Object.keys(producto).find(
        (key) => key.toLowerCase() === column.title.toLowerCase()
      ) as keyof ProductoInventario

      // Si existe, asignamos el valor a defaultValue, de lo contrario retornamos el column original
      return productoKey
        ? {
            ...column,
            defaultValue: producto[productoKey],
            value: producto[productoKey]
          }
        : column
    })
  }

  const getLastproductInventario = (
    inventarioAlmacen: InventarioAlmacen
  ): ProductoInventario => {
    return inventarioAlmacen.inventario[inventarioAlmacen.inventario.length - 1]
  }

  const getLastProductInventarioByClaveComp = (
    inventarioAlmacen: InventarioAlmacen,
    clave: string
  ): ProductoInventario | null => {
    
    // Recorrer el array de inventario en orden inverso
    for (let i = inventarioAlmacen.inventario.length - 1; i >= 0; i--) {
      console.log(inventarioAlmacen.inventario[i].claveComp,clave)
      if (inventarioAlmacen.inventario[i].claveComp === clave) {
        return inventarioAlmacen.inventario[i]
      }
    }

    // Devolver null si no se encuentra ningún producto con la clave dada
    return null
  }

  const muestraSoloLastProduct = (listado:ProductoInventario[]) =>{
   /* 
   if(listado){

    }
    */
  }

  /*const actualizarInventario = async()

  const agregarNuevaEntrada = async (
    seccion: string,
    almacen: string,
    EntradaProNuevo: ProductoInventario
  ): Promise<boolean> => {
    if (currentInventario) {
      currentInventario.inventario.push(EntradaProNuevo)
      try {
        const result = await updateInventario(
          "/EntradasInventarioPage",
          currentInventario
        )
        return result // o manejar 'result' según sea necesario
      } catch (error) {
        console.error("Error al actualizar el inventario:", error)
        return false
      }
    }

    return false
  }*/

  return {
    getInventarioSelected,
    crearNuevoInventario,
    mapColumnDescriptorsToProductoInventario,
    mapearProductoInventarioAColumnas,
    updateColumnDescriptor,
    setCurrentInventari,
    deleteLineaInventario,
    updateInventario,
    updateProductoIventario,
    getLastProductInventarioByClaveComp,
    getLastproductInventario,
    currentInventario,
    productoInventarioInicial
  }
}
