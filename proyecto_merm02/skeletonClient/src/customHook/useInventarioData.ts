import { useState } from "react"
import {
  agregarInventarioAlmacen,
  fetchInventarioAlmacenBySeccionAlmacen,
  deleteInventarioAlmacen,
  fetchUltimosProductosBySeccionAlmacen,
  deleteProductoInventario,
  deleteProductosByClaveComp,
  updateInventario,
  updateProductoInInventario,
  fetchAllInventarioAlmacen,
  getAllInventarios,
  addProductoInventario
} from "../api/InventarioApi"
import { InventarioAlmacen, ProductoInventario } from "../interfaces/Inventario"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { generateRandomColor } from "../utilidades/util"
import { TipoColor } from "../utilidades/util"
import { TableStyle } from "../interfaces/TableStyles"

export const useInventarioData = () => {
  // console.log("luego de ser seteado",HeaderInventario)
  const [currentInventario, setCurrentInventari] = useState<InventarioAlmacen>()

  const getAllInvetariosAlmacen = async (
    route: string
  ): Promise<ProductoInventario[] | null> => {
    try {
      const inventariosAlmacen = await getAllInventarios(route)

      if (inventariosAlmacen) {
        // Combina todos los productos en un solo vector
        const todosLosProductos = inventariosAlmacen.reduce<
          ProductoInventario[]
        >((acumulador, inventario) => {
          // Asumiendo que 'inventario.inventario' es el array de productos
          return acumulador.concat(inventario.inventario)
        }, [])
        return todosLosProductos
      }

      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }

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

  const getLastProductGroupInventario = async (
    route: string
  ): Promise<ProductoInventario[] | null> => {
    try {
      // Esperar el resultado de fetchUltimosProductosBySeccionAlmacen
      const productos = await fetchUltimosProductosBySeccionAlmacen(route)
      // Si productos es null o vacío, esto devolverá null. De lo contrario, devolverá los productos.
      return productos
    } catch (error) {
      console.error("Error al obtener los últimos productos:", error)
      return null
    }
  }

  const deleteByClaveComp = async (
    route: string,
    claveComp: string
  ): Promise<boolean> => {
    try {
      //console.log(claveComp)
      const response = await deleteProductosByClaveComp(route, claveComp)
      return response
    } catch (error) {
      return false
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
    exclude: string[] = []
  ): ProductoInventario => {
    const producto: any = {
      fechaEntrada: "",
      fechaSalida: "",
      idProducto: 1,
      claveComp: "",
      stock: 0,
      ultimoRegistro: false,
      cantidadSalida: 0,
      cantidadEntrante: 0,
      plancha: "",
      color: "",
      dibujo: "",
      molde: "",
      acabado01: "",
      acabado02: "",
      calibre: ""
    }

    columns.forEach((col) => {
      if (
        col.idInput &&
        col.value !== undefined &&
        !exclude.includes(col.idInput)
      ) {
        const key = col.idInput as keyof ProductoInventario

        // Parseo de tipos numéricos
        if (
          [
            "idProducto",
            "stock",
            "cantidadSalida",
            "cantidadEntrante"
          ].includes(key)
        ) {
          producto[key] = Number(col.value)
        } else if (["ultimoRegistro"].includes(key)) {
          producto[key] = Boolean(col.value)
        } else {
          producto[key] = col.value
        }
      }
    })

    return producto
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

  const generarMatrizStyle = (
    productosInventario: ProductoInventario[]
  ): TableStyle[] => {
    // Crear un mapa para almacenar colores para cada claveCompuesta
    const colorMap = new Map<string, string>()
    const color1 = "bg-white dark:bg-gray-900"
    const color2 = "bg-gray-50 dark:bg-gray-800"

    let indiceColor = 0

    return productosInventario.map((producto) => {
      // Si la claveComp no tiene un color asignado, asignar uno y actualizar el índice
      if (!colorMap.has(producto.claveComp)) {
        colorMap.set(
          producto.claveComp,
          indiceColor % 2 === 0 ? color1 : color2
        )
        indiceColor++
      }

      // Obtener el color para la claveCompuesta actual
      const color = colorMap.get(producto.claveComp) || ""

      // Crear y devolver un estilo para la fila actual
      const filaEstilo: TableStyle = {
        tableFull: "",
        thContent: "",
        trContent: color, // Tailwind CSS para aplicar el color de fondo
        tdContent: ""
      }

      return filaEstilo // Devolver como objeto para cada fila
    })
  }

  const generarMatrizColumnDescriptors = (
    columnasTemplate: ColumnDescriptor[],
    productosInventario: ProductoInventario[]
  ): ColumnDescriptor[][] => {
    return productosInventario.map((producto) => {
      const filaColumnDescriptors = mapearProductoInventarioAColumnas(
        columnasTemplate,
        producto
      )
      
      return filaColumnDescriptors.map((descriptor) => {
        // Crear una copia del descriptor para evitar modificar el original
        const descriptorCopia = { ...descriptor }

        if (
          [
            "Editar",
            "Borrar",
            "entradas",
            "salidas",
            "entradasListado",
            "salidasListado"
          ].includes(descriptorCopia.idInput)
        ) {
          // La visibilidad de Editar y Borrar depende de si es la última entrada o salida
          descriptorCopia.visible = producto.ultimoRegistro
        }

        return descriptorCopia
      })
    })
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
  ): { producto: ProductoInventario; indice: number } | null => {
    // Recorrer el array de inventario en orden inverso
    for (let i = inventarioAlmacen.inventario.length - 1; i >= 0; i--) {
      if (inventarioAlmacen.inventario[i].claveComp === clave) {
        // Devolver el producto y su índice
        return { producto: inventarioAlmacen.inventario[i], indice: i }
      }
    }

    // Devolver null si no se encuentra ningún producto con la clave dada
    return null
  }

  /*
  const actualizarInventario = async()

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
  }
  */

  return {
    getInventarioSelected,
    crearNuevoInventario,
    mapColumnDescriptorsToProductoInventario,
    mapearProductoInventarioAColumnas,
    generarMatrizColumnDescriptors,
    updateColumnDescriptor,
    setCurrentInventari,
    deleteLineaInventario,
    updateInventario,
    updateProductoIventario,
    getLastProductInventarioByClaveComp,
    getLastproductInventario,
    getLastProductGroupInventario,
    generarMatrizStyle,
    deleteByClaveComp,
    getAllInvetariosAlmacen,
    currentInventario
  }
}
