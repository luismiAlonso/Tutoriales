import { useState } from "react"
import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion" // Ajusta las rutas según sea necesario
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { useOrdenProduccionData } from "../customHook/useOrdenProduccionData"
import { ParteLaminacion } from "../models/ParteLaminacion"
import { ProductoModificacion } from "../models/ProductoModificacion"
import { HeadersProducto } from "../models/HeadersProducto"
import useFilterData from "../components/filters/useFilterData"
import { setDatosLocalStorage, getDatosLocalStorage } from "../utilidades/util"

const useOrdenProduccionManager = () => {
  const {
    mapColumnDescriptors,
    incrementarIndiceProductos,
    updateOrdenProduccion,
    mapearPropiedadesProductoLaminacion,
    getCurrentOrderProduccion,
    mapColumnDescriptorsToProducto,
    agregarNuevoProductoOP,
    recuperarDatosTemporales,
    updateColumnProduct,
    mapearProductoAColumnas,
    updateProductInOrden
  } = useOrdenProduccionData()

  const [datosColumna, setDatosColumna] = useState<ColumnDescriptor[]>([])
  const [datosLineaMod, setDatosLineaMod] = useState<ColumnDescriptor[]>([])
  const [ordenProduccion, setOrdenProduccion] = useState<
    OrdenProduccion | null | undefined
  >()

  const [listaProductosOrdenReciente, setListaProductosOrdenReciente] =
    useState<Producto[]>()
  const [ordenData, setOrdenData] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const { filterByWords, filterData } = useFilterData()

  const getAtributeList = (listado: any[]) => {
    const mappedList = mapearPropiedadesProductoLaminacion(listado)
    return mappedList
  }

  const listadoTitulosProducto: string[] = getAtributeList(HeadersProducto)

  const [selectPropiedades, setSelectedPropiedades] = useState(
    listadoTitulosProducto[0]
  )

  // Aquí puedes agregar cualquier lógica o funciones que manipulen estos estados
  // Por ejemplo, una función para actualizar 'datosColumna'

  const configurarOrdenProduccion = (orden: OrdenProduccion) => {
    if (orden === null) return

    setOrdenProduccion(orden)
    ParteLaminacion[0].value = orden.idParte
    ParteLaminacion[0].defaultValue = orden.idParte
    setDatosColumna(ParteLaminacion)
    updateOrdenProduccion(orden)
  }

  const actualizarDatos = (
    datos: ColumnDescriptor[],
    ordenProduccion: OrdenProduccion
  ) => {
    if (ordenProduccion) {
      const producto = datos || ParteLaminacion
      producto[0].value = ordenProduccion.idParte
      producto[0].defaultValue = ordenProduccion.idParte

      const mappedProducto = mapColumnDescriptors(ParteLaminacion, producto, [
        "value",
        "defaultValue"
      ])

      const indexedProduct = incrementarIndiceProductos(
        ordenProduccion.ordenesProduccion
      )

      setDatosColumna(mappedProducto)
      updateOrdenProduccion(ordenProduccion)
      setListaProductosOrdenReciente(indexedProduct)
    }
  }

  const actualizarDatosColumna = (nuevosDatos: ColumnDescriptor[]) => {
    setDatosColumna(nuevosDatos)
  }

  const actualizarDatosLinea = (nuevosDatos: ColumnDescriptor[]) => {
    setDatosLineaMod(nuevosDatos)
  }

  const actualizaOrdenProduccion = (nuevaOrdenProducion: OrdenProduccion) => {
    setOrdenProduccion(nuevaOrdenProducion)
  }

  const handleInputChange = (value: string | number, id: any) => {
    if (editMode) {
      const dataUpdated = updateColumnProduct(
        datosLineaMod,
        id,
        value,
        ProductoModificacion
      )

      if (dataUpdated) {
        setDatosLineaMod(dataUpdated)
      }
    } else {

      const currentData = recuperarDatosTemporales()

      if (currentData) {
        const dataUpdated = updateColumnProduct(
          currentData,
          id,
          value,
          ParteLaminacion
        )

        if (dataUpdated) {
          //console.log("actualizamos")
          const serializeObj = JSON.stringify(dataUpdated)
          setDatosLocalStorage("datosTemporales", serializeObj)
          setDatosColumna(dataUpdated)
        }
      } else {
        const dataUpdated = updateColumnProduct(
          ParteLaminacion,
          id,
          value,
          ParteLaminacion
        )

        if (dataUpdated) {
          //console.log("actualizamos")
          const serializeObj = JSON.stringify(dataUpdated)
          setDatosLocalStorage("datosTemporales", serializeObj)
          setDatosColumna(dataUpdated)
        }
      }
    }
  }

  const handleButtonClick = (idInput: string | number, rowIndex: number) => {
    const id = typeof idInput === "number" ? idInput.toString() : idInput
    //console.log(id)
    if (id.toLowerCase() === "agregar") {
      //este ide corresponde al boton de añadir
      const productoActual = recuperarDatosTemporales()
      if (ordenProduccion && ordenProduccion !== null) {
        if (productoActual) {
          const mappedProduct = mapColumnDescriptorsToProducto(
            productoActual,
            ordenProduccion?.idParte
          )
          mappedProduct.indiceProducto = rowIndex
          // Agregar el producto mapeado a ordenProduccion y establecer el nuevo estado
          const nuevoOrdenProduccion = { ...ordenProduccion }
          nuevoOrdenProduccion.ordenesProduccion = [
            ...nuevoOrdenProduccion.ordenesProduccion,
            mappedProduct
          ]

          setOrdenProduccion(nuevoOrdenProduccion)
          // Suponiendo que agregarNuevoProductoOP actualiza alguna fuente de datos o realiza alguna otra función
          agregarNuevoProductoOP(ordenProduccion.idParte, mappedProduct)
        } else {
          const mappedProduct = mapColumnDescriptorsToProducto(
            ParteLaminacion,
            1
          )

          const nuevoOrdenProduccion = { ...ordenProduccion }

          nuevoOrdenProduccion.ordenesProduccion = [
            ...nuevoOrdenProduccion.ordenesProduccion,
            mappedProduct
          ]

          setOrdenProduccion(nuevoOrdenProduccion)
          // Suponiendo que agregarNuevoProductoOP actualiza alguna fuente de datos o realiza alguna otra función
          agregarNuevoProductoOP(ordenProduccion.idParte, mappedProduct)
        }
      } else {
        //console.log("entro sin orden")
      }
    } else if (id.toLowerCase() === "editar") {
      setEditMode(true)

      if (listaProductosOrdenReciente) {
        const productoEditar = mapearProductoAColumnas(
          ProductoModificacion,
          listaProductosOrdenReciente[rowIndex].idParte,
          listaProductosOrdenReciente[rowIndex]
        )

        setDatosLineaMod(productoEditar)
        const serializeObj = JSON.stringify(productoEditar)
        setDatosLocalStorage("lineaProductoMod", serializeObj)
      }
    } else if (id.toLowerCase() === "aceptaredicion") {

      if (datosLineaMod) {

        if (ordenProduccion) {

          const convertProduct = mapColumnDescriptorsToProducto(
            datosLineaMod,
            ordenProduccion.idParte
          )
          console.log(convertProduct)
          updateProductInOrden(convertProduct, ordenProduccion.idParte)
          const ordenproducionActualizada = getCurrentOrderProduccion()
          //console.log(ordenproducionActualizada)
          setOrdenProduccion(ordenproducionActualizada)
          setEditMode(false)
        }
      }
    }
  }

  const handleSelection = (value: string) => {
    //console.log("Valor seleccionado:", value)
    setSelectedPropiedades(value) // Actualiza el estado con el valor seleccionado
  }

  // Opcional: Maneja el filtro si es necesario
  const handleFilter = (filterValue: string) => {
    console.log("Filtrar valores por:", filterValue)
    // Implementar lógica de filtrado aquí si es necesario
    if (ordenProduccion?.ordenesProduccion) {
      filterData(ordenProduccion?.ordenesProduccion, filterValue, "asc").then(
        (result) => {
          setListaProductosOrdenReciente(result)
        }
      )
    }
  }

  const handleInputTextChange = (idInput: string, value: string) => {
    console.log(idInput, value)
  }

  const handleInputTextClick = (valueInput: string) => {
    console.log("inputText", valueInput)
  }

  const handleFilterChange = (id: string, value: string) => {
    if (id === "byWords") {
      if (ordenProduccion?.ordenesProduccion) {
        filterByWords(
          ordenProduccion?.ordenesProduccion,
          value,
          selectPropiedades,
          "asc"
        ).then((result) => {
          setListaProductosOrdenReciente(result)
        })
      }
    }
  }

  //manejador del toogle
  const handleToggleChange = (
    idToggle: string,
    toggleState: {
      value: boolean
      sortDirection: "asc" | "desc"
    }
  ) => {
    if (idToggle === "orden01") {
      setOrdenData(toggleState.value)

      if (listaProductosOrdenReciente) {
        filterData(
          listaProductosOrdenReciente,
          selectPropiedades,
          toggleState.sortDirection
        ).then((result) => {
          console.log(result)
          setListaProductosOrdenReciente(result)
        })
      }
      // Puedes realizar acciones adicionales basadas en el estado del toggle
    }
  }

  return {
    datosColumna,
    setDatosColumna,
    datosLineaMod,
    setDatosLineaMod,
    ordenProduccion,
    setOrdenProduccion,
    ordenData,
    setOrdenData,
    editMode,
    setEditMode,
    listaProductosOrdenReciente,
    setListaProductosOrdenReciente,
    listadoTitulosProducto,
    selectPropiedades,
    actualizarDatos,
    configurarOrdenProduccion,
    handleSelection,
    handleFilter,
    handleInputTextChange,
    handleInputTextClick,
    handleFilterChange,
    handleToggleChange,
    actualizarDatosColumna,
    actualizarDatosLinea,
    actualizaOrdenProduccion,
    handleInputChange,
    handleButtonClick
  }
}

export default useOrdenProduccionManager
