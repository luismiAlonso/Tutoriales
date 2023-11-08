import { useState } from "react"
import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import { ColumnDescriptor } from "../components/ListadosTablas/Itabla"
import {
  fetchOrdenesProduccionDB,
  addOrdenProduccionDB,
  updateOrdenByIdDB
} from "../api/ordenProduccionApi"

export const useOrdenProduccionData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { addOrdenProduccion, setOrdenReciente } = useOrdenProductionStore()

  const cargarDatosOrdenProduccion = async (
    fecha: string,
    tipoGoma: string
  ) => {
    setIsLoading(true)

    const ordenesProduccion = fetchOrdenesProduccionDB()

    let idParte = 1

    if (ordenesProduccion.length > 0) {
      idParte = ordenesProduccion.length + 1 // Calcular idParte basado en la longitud de la lista
    }

    const nuevaOrdeProducion = {
      idParte: idParte,
      TipoGoma: tipoGoma,
      ordenesProduccion: [],
      fecha: fecha
    }

    await addOrdenProduccionDB(nuevaOrdeProducion)

    addOrdenProduccion(nuevaOrdeProducion)

    setIsLoading(false)
  }

  const getOrdenProduccionById = (idParte: number) => {
    const ordenesProduccion = fetchOrdenesProduccionDB()

    const parteProduccion = ordenesProduccion.filter(
      (op) => op.idParte === idParte
    )
    console.log(parteProduccion)
    if (parteProduccion) {
      return parteProduccion
    }
    return
  }

  const recuperarDatosTemporales = (): ColumnDescriptor[] | null => {
    // Intenta recuperar la cadena JSON de localStorage usando la misma clave
    const datosSerializados = localStorage.getItem("datosTemporales")

    if (datosSerializados !== null) {
      // Si los datos existen, deserializa la cadena JSON de vuelta a un array de objetos
      const columnas = JSON.parse(datosSerializados)
      return columnas
    }

    // Si no hay datos, devuelve null
    return null
  }

  const guardarDatosTemporales = (columnas: ColumnDescriptor[]) => {
    // Serializa el array de columnas a una cadena JSON
    const datosSerializados = JSON.stringify(columnas)
    //console.log(datosSerializados)
    // Guarda la cadena JSON en localStorage con una clave específica
    localStorage.setItem("datosTemporales", datosSerializados)
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
      PlanchaObtenidas: 0,
      Peso: 0,
      Formulas: 0,
      Planchas: 0,
      Acelerantes: ""
    }

    // Cargar las ordenes de producción desde localStorage
    const ordenesProduccionStr = localStorage.getItem("ordenesProduccion")
    if (!ordenesProduccionStr) {
      // Devuelve el producto por defecto
      return productoDefault
    }

    const ordenesProduccion: OrdenProduccion[] =
      JSON.parse(ordenesProduccionStr)

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

  const saveParteLaminadoActual = (
    idParte: number,
    columnas: ColumnDescriptor[]
  ) => {
    // Obtén la orden de producción específica que contiene el producto que deseas modificar
    const ordenProduccion = getOrdenProduccionById(idParte)
    if (!ordenProduccion || ordenProduccion.length === 0) {
      console.error(
        `No se encontró la orden de producción con idParte ${idParte}.`
      )
      return
    }

    // Convierte el array de ColumnDescriptor a un objeto Producto
    const producto = mapColumnDescriptorsToProducto(columnas, idParte)
    //console.log(producto)
    // Encuentra el índice del producto que deseas modificar dentro de esa orden de producción
    const productos = ordenProduccion[0].ordenesProduccion
    if (productos.length === 0) {
      console.error(
        `No se encontraron productos en la orden de producción con idParte ${idParte}.`
      )
      return
    }
    const ultimoProductoIndex = productos.length - 1

    // Reemplaza el producto existente con el nuevo objeto Producto
    productos[ultimoProductoIndex] = producto

    // Actualiza la orden de producción en la base de datos
    updateOrdenProduccion(ordenProduccion[0])
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
  }

  const mapearProductoAColumnas = (
    columnas: ColumnDescriptor[],
    idParte: number,
    producto: Producto
  ): ColumnDescriptor[] => {
    return columnas.map((column) => {
      let updatedColumn = column // Variable para almacenar la columna actualizada.
      switch (column.title) {
        case "P":
          updatedColumn = { ...column, defaultValue: idParte, value: idParte }
          break // Agregada instrucción break.
        case "OP":
          updatedColumn = {
            ...column,
            defaultValue: producto.indiceProducto,
            value: producto.indiceProducto
          }
          break // Agregada instrucción break.
        case "PASADA":
          updatedColumn = {
            ...column,
            defaultValue: producto.Pasada,
            value: producto.Pasada
          }
          break // Agregada instrucción break.
        case "TIPO":
          updatedColumn = {
            ...column,
            defaultValue: producto.Tipo,
            value: producto.Tipo
          }
          break // Agregada instrucción break.
        case "COLOR":
          updatedColumn = {
            ...column,
            defaultValue: producto.Color,
            value: producto.Color
          }
          break // Agregada instrucción break.
        case "MOLDE":
          updatedColumn = {
            ...column,
            defaultValue: producto.Molde,
            value: producto.Molde
          }
          break // Agregada instrucción break.
        case "PLANCH OB.":
          updatedColumn = {
            ...column,
            defaultValue: producto.PlanchaObtenidas,
            value: producto.PlanchaObtenidas
          }
          break // Agregada instrucción break.
        case "PESO":
          updatedColumn = {
            ...column,
            defaultValue: producto.Peso,
            value: producto.Peso
          }
          break // Agregada instrucción break.
        case "FORMULAS":
          updatedColumn = {
            ...column,
            defaultValue: producto.Formulas,
            value: producto.Formulas
          }
          break // Agregada instrucción break.
        case "PLANCHAS":
          updatedColumn = {
            ...column,
            defaultValue: producto.Planchas,
            value: producto.Planchas
          }
          break // Agregada instrucción break.
        case "ACELERANTES":
          updatedColumn = {
            ...column,
            defaultValue: producto.Acelerantes,
            value: producto.Acelerantes
          }
          break // Agregada instrucción break.
        default:
          break // Agregada instrucción break.
      }

      return updatedColumn // Devuelto updatedColumn en lugar de updateColumn.
    })
  }

  const updateOrdenProduccion = (ordenProduccion: OrdenProduccion) => {
    updateOrdenByIdDB(ordenProduccion.idParte, ordenProduccion)
  }

  //const saveProductInOrder = () => {}

  const getAllProductAndAllOrder = () => {
    const ordenesProduccion = fetchOrdenesProduccionDB()

    let superList: Producto[] = []

    ordenesProduccion.forEach((OP: OrdenProduccion) => {
      superList = [...superList, ...OP.ordenesProduccion]
    })

    return superList
  }

  const getCurrentOrderProduccion = () => {
    const ordenesProduccion = fetchOrdenesProduccionDB()

    if (ordenesProduccion && ordenesProduccion.length > 0) {
      //console.log(ordenesProduccion[ordenesProduccion.length - 1])
      return ordenesProduccion[ordenesProduccion.length - 1]
    }
    return null
  }

  const updateColumnProduct = (
    id: string | number,
    valor: string | number,
    plantilla: ColumnDescriptor[]
  ) => {
    // Primero, intenta recuperar los datos actuales desde localStorage
    const datosActuales = recuperarDatosTemporales()

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
        guardarDatosTemporales(datosActuales)
      } else {
        console.error(
          `No se encontró el descriptor de columna con idInput: ${id}`
        )
      }
    } else {
      // Luego guarda los datos actualizados de vuelta en localStorage
      plantilla[1] = {
        ...plantilla[1],
        value: valor
      }

      guardarDatosTemporales(plantilla)
      console.error("No hay datos en localStorage para actualizar.")
    }
  }

  const agregarNuevoProductoOP = (idParte: number, nuevoProducto: Producto) => {

    setIsLoading(true)
    const ordenesProduccion = fetchOrdenesProduccionDB()

    const ordenIndex = ordenesProduccion.findIndex(
      (op) => op.idParte === idParte
    )

    if (ordenIndex !== -1) {
      ordenesProduccion[ordenIndex].ordenesProduccion.push(nuevoProducto)
      updateOrdenByIdDB(idParte, ordenesProduccion[ordenIndex])
      setOrdenReciente(ordenesProduccion[ordenIndex])
    }

    setIsLoading(false)
  }

  const mapColumnDescriptorsToProducto = (
    columns: ColumnDescriptor[],
    idParte: number
  ): Producto => {
    const findValueByTitle = (title: string) => {
      return columns.find(
        (col) => col.title.toLowerCase() === title.toLowerCase()
      )
    }

    const operarioValue = findValueByTitle("PASADA");
    console.log(operarioValue.va)
    if (operarioValue === undefined || operarioValue === null || operarioValue === "") {
      // Aquí manejas el caso de que no se encuentre el valor o no sea válido
      console.error("El valor de OPERARIO no está definido o es inválido");
      // Puedes lanzar un error, devolver un valor por defecto o manejarlo como prefieras
    }
  
    // Asegúrate de que el valor es del tipo esperado, en este caso parece que esperas un número
    const operarioNumber = Number(operarioValue);
    if (isNaN(operarioNumber)) {
      // Maneja el caso de que el valor no sea un número
      console.error("El valor de OPERARIO no es un número");
    }

    return {
      idParte: idParte,
      indiceProducto: obtenerUltimoProducto(idParte).indiceProducto,
      operario: (findValueByTitle("OPERARIO")?.value as number) || 0, // Tendrás que llenar esto de alguna manera
      Pasada: (findValueByTitle("PASADA")?.value as number) || 0,
      Tipo: (findValueByTitle("TIPO")?.value as string) || "",
      Color: (findValueByTitle("COLOR")?.value as string) || "",
      Molde: (findValueByTitle("MOLDE")?.value as string) || "",
      PlanchaObtenidas: (findValueByTitle("PLANCH OB.")?.value as number) || 0,
      Peso: (findValueByTitle("PESO")?.value as number) || 0,
      Formulas: (findValueByTitle("FORMULAS")?.value as number) || 0,
      Planchas: (findValueByTitle("PLANCHAS")?.value as number) || 0,
      Acelerantes: (findValueByTitle("ACELERANTES")?.value as string) || ""
    }
  }

  return {
    isLoading,
    getDatosProducto,
    incrementarIndiceProductos,
    mapearProductoAColumnasRead,
    mapColumnDescriptorsToProducto,
    mapColumnDescriptors,
    agregarNuevoProductoOP,
    cargarDatosOrdenProduccion,
    updateOrdenProduccion,
    obtenerUltimoProducto,
    mapearProductoAColumnas,
    getOrdenProduccionById,
    getCurrentOrderProduccion,
    getAllProductAndAllOrder,
    saveParteLaminadoActual,
    recuperarDatosTemporales,
    guardarDatosTemporales,
    updateColumnProduct
  }
}
