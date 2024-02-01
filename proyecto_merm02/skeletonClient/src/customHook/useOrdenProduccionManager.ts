import { useState } from "react"
import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion" // Ajusta las rutas según sea necesario
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { useOrdenProduccionData } from "../customHook/useOrdenProduccionData"
import useColumDescriptor from "../customHook/useColumnDescriptor"
import { ParteLaminacion } from "../models/ParteLaminacion"
import { ProductoModificacion } from "../models/ProductoModificacion"
import { HeadersProducto } from "../models/HeadersProducto"
import { ResumenProducto } from "../models/ResumenProducto"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import useFilterData from "../components/filters/useFilterData"
import useInfiniteLoaderParteProducion from "../components/InfiniteLoaderComponent/useInfiniteLoaderParteProducion"
import { useParams, useNavigate } from "react-router-dom" // Importa useNavigate
import useModal from "../components/modal/useModal"
import { setDatosLocalStorage, getDatosLocalStorage } from "../utilidades/util"
import { generadorClaveCompuesta } from "../utilidades/util"
import { ProductoInicial } from "../models/ProductoInicial"
import { ItextInputFilter } from "../components/inputTextFilterComponent/ItextInputFilter"
import { IcustomSelectProp } from "../components/selectComponent/IcustomSelectProp"
import { ItoggleProps } from "../components/toggle/ItoggleProps"
import { number } from "zod"

const useOrdenProduccionManager = () => {
  const {
    mapColumnDescriptors,
    incrementarIndiceProductos,
    updateOrdenProduccion,
    checkOrdenIdOnTemp,
    getTempCurrenOrderProduccion,
    mapColumnDescriptorsToProducto,
    agregarNuevoProductoOP,
    crearNuevaOrdenProduccion,
    recuperarDatosTemporales,
    updateColumnProduct,
    getAllOrdenProduction,
    mapearProductoAColumnas,
    getCurrentOrderProduccion,
    guardarDatosTemporales,
    checkIfClaveCompExist,
    updateProductInOrden,
    deleteOrdenProducion,
    getValueAttributeOfColumnDescriptor
  } = useOrdenProduccionData()

  //const params = useParams()

  const [datosColumna, setDatosColumna] = useState<ColumnDescriptor[]>([])
  const [datosLineaMod, setDatosLineaMod] = useState<ColumnDescriptor[]>([])
  const [resumeProduct, setResumeDataProduct] = useState<Producto>(null)
  const [ordenProduccion, setOrdenProduccion] = useState<
    OrdenProduccion | null | undefined
  >()
  const { isOpen, setIsOpen, openModal, closeModal } = useModal()
  // const navigate = useNavigate() // Obtén la función navigate

  /*const [listaProductosOrdenReciente, setListaProductosOrdenReciente] =
    useState<Producto[]>()*/
  const [ordenData, setOrdenData] = useState<"asc" | "desc">("desc")
  const [editMode, setEditMode] = useState<boolean>(false)
  const [visibleList, setVisibleList] = useState<boolean>(true)
  const { filterByWords, filterData } = useFilterData()

  const {
    currentPage,
    itemsPerPage,
    loadedData,
    setLoadedData,
    calculateItemToDisplay,
    loadMoreData
  } = useInfiniteLoaderParteProducion(20)

  const { listaTotalProduccion, setListaTotalProduccion } =
    useOrdenProductionStore()

  const {
    setAttributesInColumnDescriptor,
    getValueOfAttributeFromColumnDescriptor
  } = useColumDescriptor()

  const [listadoTitulosPropiedades, setListadoTitulosPropiedades] = useState<
    string[]
  >([
    "idParte",
    "fecha",
    "indiceProducto",
    "operario",
    "pasada",
    "tipo",
    "color",
    "molde",
    "planchasObtenidas",
    "peso",
    "formulas",
    "planchas",
    "acelerantes"
  ])

  const [selectPropiedades, setSelectedPropiedades] = useState<string>(
    listadoTitulosPropiedades[0]
  )

  // Aquí puedes agregar cualquier lógica o funciones que manipulen estos estados
  // Por ejemplo, una función para actualizar 'datosColumna'


  const mapearYConfigurarProducto = (
    dataColum: ColumnDescriptor[],
    idParte: number,
    indiceProducto: number,
    fecha: string,
    tipoGoma: string,
    bamburi: string,
    excludes: string[]
  ) => {
    const mappedProduct = mapColumnDescriptorsToProducto(
      dataColum,
      idParte,
      excludes
    )

    const claveCompGen = generadorClaveCompuesta(mappedProduct, [])
    mappedProduct.indiceProducto = indiceProducto
    mappedProduct.fecha = fecha
    mappedProduct.tipoGoma = tipoGoma
    mappedProduct.bamburi = bamburi
    mappedProduct.claveComp = claveCompGen

    return mappedProduct
  }

  // Función para actualizar la orden de producción
  /*
 const actualizarYAgregarProducto = (
    mappedProduct: Producto,
    dataColum: ColumnDescriptor[],
    ordenProduccion: OrdenProduccion
  ) => {
    console.log(mappedProduct)
    console.log(dataColum)
    console.log(ordenProduccion)

    actualizarOrdenProduccion(mappedProduct, dataColum, ordenProduccion)
    setListaTotalProduccion(ordenProduccion.ordenesProduccion)
  }
  */

  /*
  const actualizarProductoEnOrden = (
    productoModificado: Producto,
    ordenProduccionActual: OrdenProduccion
  ) => {
    const ordenActualizada = {
      ...ordenProduccionActual,
      ordenesProduccion: ordenProduccionActual.ordenesProduccion.map(
        (producto) =>
          producto.indiceProducto === productoModificado.indiceProducto
            ? productoModificado
            : producto
      )
    }
    return ordenActualizada
  }*/

  const agregarNuevaOrdenProduccion = (
    producto: Producto,
    dataColum: ColumnDescriptor[],
    ordenProduccion: OrdenProduccion
  ) => {
    console.log("este es producto que voy a agregar:", producto)

    if (ordenProduccion) {
      ordenProduccion.ordenesProduccion.push(producto)
      crearNuevaOrdenProduccion(ordenProduccion).then((response) => {
        if (response) {
          setListaTotalProduccion(ordenProduccion.ordenesProduccion)
          setDatosLocalStorage("ordenesProduccion", dataColum)
          setOrdenProduccion(ordenProduccion)
          setDatosLocalStorage("datosTemporales", dataColum)
          setVisibleList(true)
        }
      })
    }
  }

  const actualizarOrdenActual = (nuevoProducto: Producto) => {
    updateProductInOrden(nuevoProducto).then((response) => {
      if (response) {
        setListaTotalProduccion(response.ordenesProduccion)
      } else {
        console.log("error al actualizar")
      }
    })
  }

  const agregarNuevoProductoAorden = (
    producto: Producto,
    dataColum: ColumnDescriptor[],
    ordenProduccion: OrdenProduccion
  ) => {
    producto.indiceProducto = ordenProduccion.ordenesProduccion.length + 1

    const nuevoOrdenProduccion = {
      ...ordenProduccion,
      ordenesProduccion: [...ordenProduccion.ordenesProduccion, producto]
    }

    agregarNuevoProductoOP(ordenProduccion.idParte, producto).then(
      (response) => {
        if (response) {
          setDatosLocalStorage("ordenesProduccion", dataColum)
          setListaTotalProduccion(nuevoOrdenProduccion.ordenesProduccion)
          setOrdenProduccion(nuevoOrdenProduccion)
          setDatosLocalStorage("datosTemporales", dataColum)
          setVisibleList(true)
        } else {
          console.log("no se agrego con exito")
        }
      }
    )
  }

  const actualizarDatos = async () => {

    const ordenProduccionActual = await getCurrentOrderProduccion()
    const tempProduct = getDatosLocalStorage("datosTemporales")
    const preOrden = getDatosLocalStorage("preOrden") as OrdenProduccion

    /*const ultimaPreOrden = todasLasOrdenes[
      todasLasOrdenes.length - 1
    ] as OrdenProduccion*/

    if (ordenProduccionActual) {
      const producto = ProductoInicial || tempProduct

      let settingProductoInicial = setAttributesInColumnDescriptor(
        producto,
        "idParte",
        ["value", "defaultValue"],
        [preOrden.idParte, preOrden.idParte]
      )

      settingProductoInicial = setAttributesInColumnDescriptor(
        settingProductoInicial,
        "bamburi",
        ["value", "defaultValue"],
        [preOrden.bamburi, preOrden.bamburi]
      )

      //const mappedProducto = mapColumnDescriptors(ProductoInicial, settingProductoInicial, [])

      const indexedProduct = incrementarIndiceProductos(
        ordenProduccionActual.ordenesProduccion
      )

      ordenProduccionActual.ordenesProduccion = indexedProduct
      //updateOrdenProduccion(ordenProduccion)
      //setListaProductosOrdenReciente(indexedProduct)
      if (ordenProduccionActual.idParte !== preOrden.idParte) {
        setVisibleList(false)
      } else {
        setVisibleList(true)
      }

      //ordenProduccionActual.idParte = preOrden.idParte
      setListaTotalProduccion(indexedProduct)
      setOrdenProduccion(ordenProduccionActual)
      setDatosLocalStorage("datosTemporales", settingProductoInicial)
      setDatosColumna(settingProductoInicial)
      setOrdenProduccion(ordenProduccionActual)
    } else {
      //console.log("setOrdenProduccion",ultimaPreOrden)
      setVisibleList(false)

      if (tempProduct) {
        let settingProductoInicial = setAttributesInColumnDescriptor(
          tempProduct,
          "idParte",
          ["value", "defaultValue"],
          [preOrden.idParte, preOrden.idParte]
        )
        settingProductoInicial = setAttributesInColumnDescriptor(
          settingProductoInicial,
          "bamburi",
          ["value", "defaultValue"],
          [preOrden.bamburi, preOrden.bamburi]
        )

        setDatosLocalStorage("datosTemporales", settingProductoInicial)
        setDatosColumna(settingProductoInicial)
        setOrdenProduccion(preOrden)
      } else {
        // console.log("setOrdenProduccion",ultimaPreOrden)

        let settingProductoInicial = setAttributesInColumnDescriptor(
          ProductoInicial,
          "idParte",
          ["value", "defaultValue"],
          [preOrden.idParte, preOrden.idParte]
        )

        settingProductoInicial = setAttributesInColumnDescriptor(
          settingProductoInicial,
          "bamburi",
          ["value", "defaultValue"],
          [preOrden.bamburi, preOrden.bamburi]
        )

        setDatosLocalStorage("datosTemporales", settingProductoInicial)
        setDatosColumna(settingProductoInicial)
        setOrdenProduccion(preOrden)
      }
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

      console.log("updated", dataUpdated)
      console.log("linea", datosLineaMod)

      if (dataUpdated) {
        setDatosLineaMod(dataUpdated)
        setDatosLocalStorage("datosTemporales",dataUpdated)
      }
    } else {

      const currentData = getDatosLocalStorage("datosTemporales") //recuperarDatosTemporales()

      if (currentData) {
        const dataUpdated = updateColumnProduct(
          currentData,
          id,
          value,
          ProductoInicial
        )

       
        if (dataUpdated) {
          console.log("actualizamos")
          setDatosLocalStorage("datosTemporales", dataUpdated)
          setDatosColumna(dataUpdated)
        }

      } else {
        const dataUpdated = updateColumnProduct(
          ParteLaminacion,
          id,
          value,
          ProductoInicial
        )

        if (dataUpdated) {
          console.log("actualizamos")
          setDatosLocalStorage("datosTemporales", dataUpdated)
          //console.log(dataUpdated)
          setDatosColumna(dataUpdated)
        }
      }
    }
  }

  const handleButtonClick = async (
    idInput: string | number,
    rowIndex: number
  ) => {

    const id = typeof idInput === "number" ? idInput.toString() : idInput    
    if (id.toLowerCase() === "agregar") {
      agregarEntrada()
    } else if (id.toLowerCase() === "editar") {
      //console.log(listaTotalProduccion[rowIndex])

      setEditMode(true)

      if (listaTotalProduccion) {
        const productoEditar = mapearProductoAColumnas(
          ProductoModificacion,
          listaTotalProduccion[rowIndex].idParte,
          listaTotalProduccion[rowIndex]
        )

        setDatosLineaMod(productoEditar)
      }
    } else if (id.toLowerCase() === "aceptaredicion") {
      if (datosLineaMod) {
        const idProducto = getValueOfAttributeFromColumnDescriptor(
          datosLineaMod,
          "indiceProducto",
          "value"
        )

        if (ordenProduccion && idProducto) {
          const mappedProduct = mapearYConfigurarProducto(
            datosLineaMod,
            ordenProduccion.idParte,
            Number(idProducto),
            ordenProduccion.fecha,
            ordenProduccion.TipoGoma,
            ordenProduccion.bamburi,
            ["aceptarEdicion"]
          )

          actualizarOrdenActual(mappedProduct)
          setEditMode(false)
        } else {
          console.log("no encuentra la orden de produccion")
        }
      }
    } else if (id.toLowerCase() === "borrar") {
      setResumeDataProduct(listaTotalProduccion[rowIndex])
      handleOpenModal()
    }
  }

  const agregarEntrada = async () => {
    const ultimaOrdenCreada = await getCurrentOrderProduccion()
    const preOrden = getDatosLocalStorage("preOrden")

    if (ordenProduccion) {
      if (ultimaOrdenCreada) {
        //comprobamos que los idde parte coincidan
        if (ordenProduccion.idParte === preOrden.idParte) {
          //comprobamos que se haya producido alguna modificacion del producto
          const indiceProducto = ordenProduccion.ordenesProduccion.length + 1
          const mappedProduct = mapearYConfigurarProducto(
            datosColumna,
            preOrden.idParte,
            indiceProducto,
            preOrden.fecha,
            preOrden.TipoGoma,
            preOrden.bamburi,
            []
          )

          if (
            !checkIfClaveCompExist(
              mappedProduct,
              ordenProduccion.ordenesProduccion
            )
          ) {
            console.log(" actualizamos ")
            agregarNuevoProductoAorden(
              mappedProduct,
              datosColumna,
              ordenProduccion
            )
          }
        } else {
          const indiceProducto = preOrden.ordenesProduccion.length + 1
          const mappedProduct = mapearYConfigurarProducto(
            datosColumna,
            preOrden.idParte,
            indiceProducto,
            preOrden.fecha,
            preOrden.TipoGoma,
            preOrden.bamburi,
            []
          )

          //console.log(" entro a crear nuevo ", preOrden)
          agregarNuevaOrdenProduccion(mappedProduct, datosColumna, preOrden)
        }
        //setListaTotalProduccion(ordenProduccion.ordenesProduccion)
      } else {
        //comprobamos que se haya producido alguna modificacion del producto
        const indiceProducto = ordenProduccion.ordenesProduccion.length + 1
        const mappedProduct = mapearYConfigurarProducto(
          datosColumna,
          preOrden.idParte,
          indiceProducto,
          preOrden.fecha,
          preOrden.TipoGoma,
          preOrden.bamburi,
          []
        )

        console.log("entro a crear por primera vez ", ordenProduccion)
        //crear una nuevo Parte
        crearNuevaOrdenProduccion(ordenProduccion).then((response) => {
          if (response?.status === 200) {
            //agregamos nueva linea produccion
            agregarNuevoProductoAorden(
              mappedProduct,
              datosColumna,
              ordenProduccion
            )

            setListaTotalProduccion(ordenProduccion.ordenesProduccion)
            console.log("...listo!!!")
          } else {
            console.error("Error al crear la orden de producción")
          }
        })
      }

      //setVisibleList(true)
    } else {
      //ordenProducion no existe
      console.log(ordenProduccion)
    }
  }

  const handleDeleteProducto = (
    e: React.MouseEvent<HTMLButtonElement>,
    idInput: string | number | undefined
  ) => {
    if (idInput === "btDelete") {
      if (ordenProduccion && resumeProduct) {
        deleteOrdenProducion(
          ordenProduccion.idParte,
          resumeProduct.indiceProducto
        ).then((response) => {
          if (response) {
            setIsOpen(false)
            setListaTotalProduccion(response.ordenesProduccion)
            setOrdenProduccion(response)
          } else {
            console.log(response)
          }
        })
      }
    }
  }

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedPropiedades(value) // Actualiza el estado con el valor seleccionado
  }

  // Opcional: Maneja el filtro si es necesario
  const handleFilter = (filterValue: string) => {
    console.log("Filtrar valores por:", filterValue)
    // Implementar lógica de filtrado aquí si es necesario
    if (ordenProduccion?.ordenesProduccion) {
      filterData(ordenProduccion?.ordenesProduccion, filterValue, "asc").then(
        (result) => {
          // setListaProductosOrdenReciente(result)
          setListaTotalProduccion(result)
        }
      )
    }
  }

  //
  const handleOpenModal = () => {
    console.log("Open Modal")
    openModal()
  }

  const handleCloseModal = () => {
    closeModal()
  }

  const handleIsOpen = () => {
    return isOpen
  }

  const handleInputTextChange = (idInput: string, value: string) => {
    console.log(idInput, value)
  }

  const handleInputTextClick = (valueInput: string) => {
    console.log("inputText", valueInput)
  }

  const handleFilterChange = (id: string, value: string) => {
    if (id === "byWords") {
      if (value === "") {
        if (ordenProduccion)
          setListaTotalProduccion(ordenProduccion.ordenesProduccion)
      } else {
        filterByWords(
          listaTotalProduccion,
          value,
          selectPropiedades,
          "asc"
        ).then((result) => {
          //setListaProductosOrdenReciente(result)
          setListaTotalProduccion(result)
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
    if (idToggle === "orden") {
      setOrdenData(toggleState.sortDirection)

      if (listaTotalProduccion) {
        filterData(
          listaTotalProduccion,
          selectPropiedades,
          toggleState.sortDirection
        ).then((result) => {
          //console.log(result)
          //setListaProductosOrdenReciente(result)
          setListaTotalProduccion(result)
        })
      }
      // Puedes realizar acciones adicionales basadas en el estado del toggle
    }
  }

  const plantillaFiltersOrdenProduccion = [
    {
      type: "text",
      idInput: "byWords",
      activeButton: false,
      activeSearchIcon: true,
      readonly:false,
      placeHolder: "write to search...",
      activeLabel: true,
      typeFill: "search",
      style:
        "block w-32 p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
      onChange: handleInputTextChange, // Asegúrate de definir esta función en el contexto adecuado
      onClick: handleInputTextClick,
      onFilter: handleFilterChange
    } as ItextInputFilter,
    {
      idInput: "selectPropiedades",
      type: "select",
      activeLabel: true,
      optionsSelect: listadoTitulosPropiedades,
      idSelected: "selectPropiedades",
      selectClassName: "mt-4 mb-4 w-1/4",
      value: selectPropiedades, // Asegúrate de que estas variables estén definidas
      defaultValue: listadoTitulosPropiedades[0], // o el valor que necesites
      onSeleccion: handleSelection,
      onFilter: handleFilter,
      onChange: handleSelection
    } as IcustomSelectProp,
    {
      idInput: "orden",
      type: "toggle",
      activeLabel: true,
      valueProp: false,
      trueText: "asc",
      falseText: "desc",
      onChange: handleToggleChange
    } as ItoggleProps

    // Puedes agregar más filtros según necesites
  ]

  return {
    currentPage,
    itemsPerPage,
    loadedData,
    datosColumna,
    listadoTitulosPropiedades,
    selectPropiedades,
    datosLineaMod,
    ordenProduccion,
    ordenData,
    editMode,
    //listaProductosOrdenReciente,
    listaTotalProduccion,
    isOpen,
    ResumenProducto,
    resumeProduct,
    plantillaFiltersOrdenProduccion,
    visibleList,
    setResumeDataProduct,
    handleIsOpen,
    handleCloseModal,
    handleOpenModal,
    setDatosColumna,
    setDatosLineaMod,
    setOrdenProduccion,
    setOrdenData,
    setEditMode,
    setLoadedData,
    calculateItemToDisplay,
    loadMoreData,
    actualizarDatos,
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
    handleButtonClick,
    handleDeleteProducto
  }
}

export default useOrdenProduccionManager
