import { useState } from "react"
import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import { setDatosLocalStorage, getDatosLocalStorage } from "../utilidades/util"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import {
  fetchOrdenesProduccionDB,
  addOrdenProduccionDB,
  updateOrdenByIdDB,
  updateProductInOrdenProduccionDB,
  deleteProductFromOrdenProduccionDB
} from "../api/ordenProduccionApi"
import { ProductoInventario } from "../interfaces/Inventario"

export const useOrdenProduccionData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const cargarDatosOrdenProduccion = async (
    nuevaOrdenProduccion: OrdenProduccion
  ) => {
    setIsLoading(true)

    try {
      // Esperar a que se resuelva la promesa para obtener las órdenes de producción
      const ordenesProduccion = await fetchOrdenesProduccionDB()
      // Verificar si ordenesProduccion contiene datos
      if (!Array.isArray(ordenesProduccion) || ordenesProduccion.length === 0) {
        // Manejar el caso en el que no hay datos (mostrar mensaje, etc.)
        console.error("No se encontraron órdenes de producción.")
      }

      const idParte = ordenesProduccion.length + 1

      nuevaOrdenProduccion.idParte = idParte

      /*
      // Es opcion almacena la orden de produccion en base de datos
      addOrdenProduccion(nuevaOrdeProducion)
      // Agregar la nueva orden de producción a la base de datos
      const response = await addOrdenProduccionDB(nuevaOrdeProducion)
      return response
      */
      ordenesProduccion.push(nuevaOrdenProduccion)

      //console.log(datosSerializados)
      // Guarda la cadena JSON en localStorage con una clave específica
      setDatosLocalStorage("ordenesProduccion", ordenesProduccion)
      return nuevaOrdenProduccion
    } catch (error) {
      console.error("Error al cargar o agregar orden de producción:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getOrdenProduccionById = async (idParte: number) => {
    try {
      // Esperar a que se resuelva la promesa para obtener las órdenes de producción
      const ordenesProduccion = await fetchOrdenesProduccionDB()

      // Filtrar para encontrar la orden de producción específica
      const parteProduccion = ordenesProduccion.find(
        (op) => op.idParte === idParte
      )

      // Verificar si se encontró la orden de producción
      if (parteProduccion) {
        return parteProduccion
      } else {
        // Manejar el caso en el que no se encuentra la orden de producción
        console.error(
          `Orden de producción con idParte ${idParte} no encontrada.`
        )
        return null
      }
    } catch (error) {
      console.error("Error al obtener la orden de producción por ID:", error)
      return null
    }
  }

  const recuperarDatosTemporales = (): ColumnDescriptor[] | null => {
    // Intenta recuperar la cadena JSON de localStorage usando la misma clave
    const datosSerializados = getDatosLocalStorage("datosTemporales")
    if (datosSerializados !== null) {
      // Si los datos existen, deserializa la cadena JSON de vuelta a un array de objetos
      return datosSerializados
    }
    // Si no hay datos, devuelve null
    return null
  }

  const guardarDatosTemporales = (columnas: ColumnDescriptor[]) => {
    // Serializa el array de columnas a una cadena JSON
    // Guarda la cadena JSON en localStorage con una clave específica
    setDatosLocalStorage("datosTemporales", columnas)
  }

  const obtenerUltimoProducto = (idParte: number) => {
    // Define el producto por defecto al inicio
    const productoDefault = {
      idParte: idParte,
      indiceProducto: 1,
      operario: "1",
      Pasada: 1,
      Tipo: "",
      Color: "",
      Molde: "",
      claveComp: "",
      PlanchaObtenidas: 0,
      Peso: 0,
      Formulas: 0,
      Planchas: 0,
      Acelerantes: ""
    }

    // Cargar las ordenes de producción desde localStorage
    const ordenesProduccionStr = getDatosLocalStorage("ordenesProduccion")
    if (!ordenesProduccionStr) {
      // Devuelve el producto por defecto
      return productoDefault
    }

    const ordenesProduccion: OrdenProduccion[] = ordenesProduccionStr

    // Encontrar la orden de producción específica
    const ordenProduccion = ordenesProduccion.find(
      (orden) => orden.idParte === idParte
    )
    if (!ordenProduccion) {
      // Devuelve el producto por defecto
      return productoDefault
    }

    // Obtener el último producto
    const productos = ordenProduccion.ordenesProduccion
    if (productos.length === 0) {
      // Devuelve el producto por defecto
      return productoDefault
    }

    const ultimoProducto = productos[productos.length - 1]
    return ultimoProducto
  }

  const getDatosProducto = () => {
    const producto = localStorage.getItem("productoData")
    if (producto) return producto
  }

  const saveParteLaminadoActual = async (
    idParte: number,
    columnas: ColumnDescriptor[]
  ) => {
    try {
      // Obtén la orden de producción específica que contiene el producto que deseas modificar
      const ordenProduccion = await getOrdenProduccionById(idParte)

      if (!ordenProduccion) {
        console.error(
          `No se encontró la orden de producción con idParte ${idParte}.`
        )
        return
      }

      // Convierte el array de ColumnDescriptor a un objeto Producto
      const producto = mapColumnDescriptorsToProducto(columnas, idParte)

      // Verifica si hay productos en la orden de producción
      if (ordenProduccion.ordenesProduccion.length === 0) {
        console.error(
          `No se encontraron productos en la orden de producción con idParte ${idParte}.`
        )
        return
      }

      // Encuentra el índice del último producto en la orden de producción
      const ultimoProductoIndex = ordenProduccion.ordenesProduccion.length - 1

      // Reemplaza el producto existente con el nuevo objeto Producto
      ordenProduccion.ordenesProduccion[ultimoProductoIndex] = producto

      // Actualiza la orden de producción en la base de datos
      await updateOrdenProduccion(ordenProduccion)
    } catch (error) {
      console.error("Error al guardar la parte de laminado:", error)
    }
  }

  const incrementarIndiceProductos = (productos: Producto[]): Producto[] => {
    return productos.map((producto, index) => ({
      ...producto,
      indiceProducto: index + 1
    }))
  }

  const mapearProductoAColumnasRead = (
    columnasTemplate: ColumnDescriptor[],
    producto: Producto
  ): ColumnDescriptor[] => {
    return columnasTemplate.map((column) => {
      // Convertimos el título a lowercase y buscamos si ese valor existe en el objeto Producto
      const productoKey = Object.keys(producto).find(
        (key) => key.toLowerCase() === column.title.toLowerCase()
      ) as keyof Producto

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

  /*
  const mapColumnDescriptors = (
    template: ColumnDescriptor[],
    data: ColumnDescriptor[],
    fieldsToExclude: string[] = []
  ): ColumnDescriptor[] => {
    return template.map((templateColumn) => {
      // Encontrar la columna correspondiente en data
      const dataColumn = data.find((dc) => dc.title === templateColumn.title)
      // Si existe una columna correspondiente y no está en la lista de exclusión
      if (dataColumn) {
        return Object.keys(templateColumn).reduce((newColumn, key) => {
          // Si la clave no está en la lista de exclusión, usar el valor de dataColumn
          if (!fieldsToExclude.includes(key)) {
            newColumn[key as keyof ColumnDescriptor] =
              templateColumn[key as keyof ColumnDescriptor]
          }
          // Si la clave está en la lista de exclusión, usar el valor de templateColumn
          else {
            newColumn[key as keyof ColumnDescriptor] =
              dataColumn[key as keyof ColumnDescriptor]
          }
          return newColumn
        }, {} as ColumnDescriptor)
      }
      // Si no hay una columna correspondiente, devolver la columna del template
      return templateColumn
    })
  }*/

  const mapColumnDescriptors = (
    template: ColumnDescriptor[],
    data: ColumnDescriptor[],
    fieldsToExclude: string[] = []
  ): ColumnDescriptor[] => {
    return template.map((templateColumn) => {
      const dataColumn = data.find((dc) => dc.title === templateColumn.title)

      if (dataColumn) {
        return Object.keys(templateColumn).reduce<ColumnDescriptor>(
          (newColumn, key) => {
            if (!fieldsToExclude.includes(key)) {
              newColumn[key as keyof ColumnDescriptor] =
                dataColumn[key as keyof ColumnDescriptor]
            } else {
              newColumn[key as keyof ColumnDescriptor] =
                templateColumn[key as keyof ColumnDescriptor]
            }
            return newColumn
          },
          {} as ColumnDescriptor
        )
      }
      return templateColumn
    })
  }

  const mapearProductoAColumnas = (
    columnas: ColumnDescriptor[],
    idParte: number,
    producto: Producto
  ): ColumnDescriptor[] => {
    return columnas.map((column) => {
      let updatedColumn = column // Variable para almacenar la columna actualizada.
      switch (column.title) {
        case "IDPARTE":
          updatedColumn = { ...column, defaultValue: idParte, value: idParte }
          break // Agregada instrucción break.
        case "OPERARIO":
          updatedColumn = {
            ...column,
            defaultValue: producto.operario,
            value: producto.operario
          }
          break // Agregada instrucción break.
        case "INDICE PRODUCTO":
          updatedColumn = {
            ...column,
            defaultValue: producto.indiceProducto,
            value: producto.indiceProducto
          }
          break // Agregada instrucción break.
        case "ID PRODUCT":
          updatedColumn = {
            ...column,
            defaultValue: producto.indiceProducto,
            value: producto.indiceProducto
          }
          break
        case "FECHA":
          updatedColumn = {
            ...column,
            defaultValue: producto.fecha,
            value: producto.fecha
          }
          break
        case "BAMBURI":
          updatedColumn = {
            ...column,
            defaultValue: producto.bamburi,
            value: producto.bamburi
          }
          break
        case "PASADA":
          updatedColumn = {
            ...column,
            defaultValue: producto.pasada,
            value: producto.pasada
          }
          break // Agregada instrucción break.
        case "TIPO":
          updatedColumn = {
            ...column,
            defaultValue: producto.tipo,
            value: producto.tipo
          }
          break // Agregada instrucción break.
        case "COLOR":
          updatedColumn = {
            ...column,
            defaultValue: producto.color,
            value: producto.color
          }
          break // Agregada instrucción break.
        case "MOLDE":
          updatedColumn = {
            ...column,
            defaultValue: producto.molde,
            value: producto.molde
          }
          break // Agregada instrucción break.
        case "PLANCH OB.":
          updatedColumn = {
            ...column,
            defaultValue: producto.planchaobtenidas,
            value: producto.planchaobtenidas
          }
          break // Agregada instrucción break.
        case "PESO":
          updatedColumn = {
            ...column,
            defaultValue: producto.peso,
            value: producto.peso
          }
          break // Agregada instrucción break.
        case "FORMULAS":
          updatedColumn = {
            ...column,
            defaultValue: producto.formulas,
            value: producto.formulas
          }
          break // Agregada instrucción break.
        case "PLANCHAS":
          updatedColumn = {
            ...column,
            defaultValue: producto.planchas,
            value: producto.planchas
          }
          break // Agregada instrucción break.
        case "ACELERANTES":
          updatedColumn = {
            ...column,
            defaultValue: producto.acelerantes,
            value: producto.acelerantes
          }
          break // Agregada instrucción break.
        default:
          break // Agregada instrucción break.
      }

      return updatedColumn // Devuelto updatedColumn en lugar de updateColumn.
    })
  }

  const deleteOrdenProducion = (idParte: number, idProducto: number) => {
    //console.log(producto)
    return deleteProductFromOrdenProduccionDB(idParte, idProducto) 
  }

  const updateOrdenProduccion = (ordenProduccion: OrdenProduccion) => {
    return updateOrdenByIdDB(ordenProduccion.idParte, ordenProduccion)
  }

  const updateProductInOrden = (producto: Producto )=> {
    return updateProductInOrdenProduccionDB(producto.idParte, producto.indiceProducto, producto)
  }

  const getAllProductAndAllOrder = async () => {

    try {
      // Esperar a que se resuelva la promesa para obtener las órdenes de producción
      const ordenesProduccion = await fetchOrdenesProduccionDB()

      let superList: Producto[] = []

      // Iterar sobre cada orden de producción y acumular todos los productos
      ordenesProduccion.forEach((OP: OrdenProduccion) => {
        superList = [...superList, ...OP.ordenesProduccion]
      })

      return superList
    } catch (error) {
      console.error(
        "Error al obtener todos los productos y órdenes de producción:",
        error
      )
      return []
    }
  }

  const getAllOrdenProduction = async () => {
    try {
      return fetchOrdenesProduccionDB()
    } catch (error) {
      return null
    }
  }

  const getCurrentOrderProduccion = async () => {
    try {
      // Esperar a que se resuelva la promesa para obtener las órdenes de producción
      const ordenesProduccion = await fetchOrdenesProduccionDB()
      // Comprobar si hay órdenes de producción y devolver la más reciente
      if (ordenesProduccion && ordenesProduccion.length > 0) {
        return ordenesProduccion[ordenesProduccion.length - 1]
      }

      return null
    } catch (error) {
      console.error("Error al obtener la orden de producción actual:", error)
      return null
    }
  }

  const getTempCurrenOrderProduccion = () => {
    try {
      // Recuperar las órdenes de producción desde localStorage
      const ordenesProduccionJSON = localStorage.getItem("ordenesProduccion")

      if (!ordenesProduccionJSON) {
        console.log("No hay órdenes de producción almacenadas.")
        return null // O manejar de otra forma si es necesario
      }

      const ordenesProduccion = JSON.parse(
        ordenesProduccionJSON
      ) as OrdenProduccion[]

      if (ordenesProduccion.length === 0) {
        console.log("La lista de órdenes de producción está vacía.")
        return null // O manejar de otra forma si es necesario
      }

      // Devolver la última orden de producción
      return ordenesProduccion[ordenesProduccion.length - 1]
    } catch (error) {
      console.error("Error al recuperar la orden de producción actual:", error)
      return null // O manejar el error de otra forma si es necesario
    }
  }

  const updateColumnProduct = (
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

  /*
  const updateColumnProduct = (
    datosActuales: ColumnDescriptor[],
    id: string | number,
    valor: string | number,
    plantilla: ColumnDescriptor[]
  ) => {
    const datosModificados =
      datosActuales !== null ? [...datosActuales] : [...plantilla]

    // Buscar en los datos actuales o plantilla
    const index = datosModificados.findIndex(
      (columna) => columna.idInput === id
    )

    if (index !== -1) {
      // Actualiza el valor si se encuentra el descriptor
      datosModificados[index] = {
        ...datosModificados[index],
        value: valor
      }
    } else {
      // Si no se encuentra en datosActuales, busca en la plantilla
      const indexPlantilla = plantilla.findIndex(
        (columna) => columna.idInput === id
      )
      if (indexPlantilla !== -1) {
        // Crea un nuevo objeto combinando la plantilla y el nuevo valor
        const nuevoColumnDescriptor = {
          ...plantilla[indexPlantilla],
          value: valor
        }
        // Añade este nuevo objeto a los datos modificados
        datosModificados.push(nuevoColumnDescriptor)
      } else {
        console.error(
          `No se encontró el descriptor de columna con idInput: ${id}`
        )
      }
    }

    // Guarda los datos actualizados en localStorage
    // guardarDatosTemporales(datosModificados);
    return datosModificados
}
*/

  const crearNuevaOrdenProduccion = async (
    nuevaOrdenProduccion: OrdenProduccion
  ) => {
    //console.log(nuevaOrdenProduccion)
    return await addOrdenProduccionDB(nuevaOrdenProduccion)
  }

  const checkIfClaveCompExist = (
    producto: Producto,
    ordenesProduccion: Producto[]
  ): boolean => {
    return ordenesProduccion.some(
      (orden) => orden.claveComp === producto.claveComp
    )
  }

  const agregarNuevoProductoOP = async (
    idParte: number,
    nuevoProducto: Producto
  ) => {
    try {
      setIsLoading(true)

      // Esperar a que se resuelva la promesa para obtener las órdenes de producción
      const ordenesProduccion = await fetchOrdenesProduccionDB()
      // Encontrar el índice de la orden de producción específica
      const ordenIndex = ordenesProduccion.findIndex(
        (op) => op.idParte === idParte
      )

      if (ordenIndex !== -1) {
        // Agregar el nuevo producto a la orden de producción encontrada
        ordenesProduccion[ordenIndex].ordenesProduccion.push(nuevoProducto)
        // Actualizar la orden de producción en la base de datos
        //console.log(ordenesProduccion[ordenIndex])

        const response = await updateOrdenByIdDB(
          idParte,
          ordenesProduccion[ordenIndex]
        )

        if (response) {
          return ordenesProduccion
        } else {
          return null
        }

        // Actualizar el estado local si es necesario
        // setOrdenReciente(ordenesProduccion[ordenIndex])
      } else {
        console.error(
          `No se encontró la orden de producción con idParte ${idParte}.`
        )

        return null // Devuelve null si no se encuentra la orden de producción
      }
    } catch (error) {
      console.error(
        "Error al agregar nuevo producto a la orden de producción:",
        error
      )
      return null // Devuelve null en caso de error
    } finally {
      setIsLoading(false)
    }
  }

  const checkOrdenIdOnTemp = (ordenProduccion: OrdenProduccion): boolean => {
    getCurrentOrderProduccion().then((orden) => {
      if (orden) {
        if (ordenProduccion.idParte === orden.idParte) {
          return true
        }
        return false
      }
    })

    return false
  }

  const mapColumnDescriptorsToProducto = (
    columns: ColumnDescriptor[],
    idParte: number,
    exclude: string[] = [] // Array de propiedades a excluir
  ): Producto => {
    const producto: any = {}

    columns.forEach((col) => {
      if (
        col.idInput &&
        col.value !== undefined &&
        !exclude.includes(col.idInput)
      ) {
        const key = col.idInput
        //parseo de tipos numericos
        if (
          key === "idParte" ||
          key === "indiceProducto" ||
          key === "operario" ||
          key === "pasada" ||
          key === "peso" ||
          key === "formulas" ||
          key === "planchas"
        ) {
          // Convierte a número
          producto[key] = Number(col.value)
        } else {
          // Mantiene como cadena
          producto[key] = col.value
        }
      }
    })

    producto.idParte = idParte
    return producto as Producto
  }

  return {
    isLoading,
    getDatosProducto,
    incrementarIndiceProductos,
    mapearProductoAColumnasRead,
    mapColumnDescriptorsToProducto,
    mapColumnDescriptors,
    agregarNuevoProductoOP,
    crearNuevaOrdenProduccion,
    cargarDatosOrdenProduccion,
    updateOrdenProduccion,
    obtenerUltimoProducto,
    mapearProductoAColumnas,
    getOrdenProduccionById,
    getCurrentOrderProduccion,
    getTempCurrenOrderProduccion,
    getAllProductAndAllOrder,
    getAllOrdenProduction,
    checkOrdenIdOnTemp,
    checkIfClaveCompExist,
    saveParteLaminadoActual,
    recuperarDatosTemporales,
    guardarDatosTemporales,
    updateColumnProduct,
    updateProductInOrden,
    deleteOrdenProducion
  }
}
