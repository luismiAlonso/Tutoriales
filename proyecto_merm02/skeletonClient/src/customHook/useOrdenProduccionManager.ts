import { useState } from "react"
import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion" // Ajusta las rutas según sea necesario
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { useOrdenProduccionData } from "../customHook/useOrdenProduccionData"
import { ParteLaminacion } from "../models/ParteLaminacion"
import { ProductoModificacion } from "../models/ProductoModificacion"
import { HeadersProducto } from "../models/HeadersProducto"
import { ResumenProducto } from "../models/ResumenProducto"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import useFilterData from "../components/filters/useFilterData"
import useInfiniteLoader from "../components/InfiniteLoaderComponent/useInfiniteLoader"
import { useParams, useNavigate } from "react-router-dom" // Importa useNavigate
import useModal from "../components/modal/useModal"
import { setDatosLocalStorage, getDatosLocalStorage } from "../utilidades/util"
import { ProductoInicial } from "../models/ProductoInicial"

const useOrdenProduccionManager = () => {
  const {
    mapColumnDescriptors,
    incrementarIndiceProductos,
    updateOrdenProduccion,
    getTempCurrenOrderProduccion,
    mapColumnDescriptorsToProducto,
    agregarNuevoProductoOP,
    crearNuevaOrdenProduccion,
    recuperarDatosTemporales,
    updateColumnProduct,
    mapearProductoAColumnas,
    updateProductInOrden,
    deleteOrdenProducion
  } = useOrdenProduccionData()

  //const params = useParams()

  const [datosColumna, setDatosColumna] = useState<ColumnDescriptor[]>([])
  const [datosLineaMod, setDatosLineaMod] = useState<ColumnDescriptor[]>([])
  const [resumeProduct, setResumeDataProduct] = useState<Producto>(null)
  const [ordenProduccion, setOrdenProduccion] = useState<
    OrdenProduccion | null | undefined
  >()
  const [hasOrdenProduct, setHasOrdenProduct] = useState<boolean>(false)
  const { isOpen, setIsOpen, openModal, closeModal } = useModal()
  const navigate = useNavigate() // Obtén la función navigate

  /*const [listaProductosOrdenReciente, setListaProductosOrdenReciente] =
    useState<Producto[]>()*/
  const [ordenData, setOrdenData] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const { filterByWords, filterData } = useFilterData()

  const {
    currentPage,
    itemsPerPage,
    loadedData,
    setLoadedData,
    calculateItemToDisplay,
    loadMoreData
  } = useInfiniteLoader(20)

  const { listaTotalProduccion, setListaTotalProduccion } =
    useOrdenProductionStore()

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

  const configurarOrdenProduccion = (orden: OrdenProduccion) => {
    if (orden === null) return
    setOrdenProduccion(orden)
    ProductoInicial[0].value = orden.idParte
    ProductoInicial[0].defaultValue = orden.idParte
    setDatosColumna(ProductoInicial)
    //updateOrdenProduccion(orden)
  }

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
    mappedProduct.indiceProducto = indiceProducto
    mappedProduct.fecha = fecha
    mappedProduct.tipoGoma = tipoGoma
    mappedProduct.bamburi = bamburi
    return mappedProduct
  }

  // Función para actualizar la orden de producción
  const actualizarYAgregarProducto = (
    mappedProduct: Producto,
    dataColum: ColumnDescriptor[],
    ordenProduccion: OrdenProduccion
  ) => {

    //console.log(mappedProduct)
    actualizarOrdenProduccion(mappedProduct,dataColum,ordenProduccion)
    agregarNuevoProductoOP(ordenProduccion.idParte, mappedProduct)
    setListaTotalProduccion(ordenProduccion.ordenesProduccion)

  }

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
  }

  const actualizarOrdenProduccion = (
    producto: Producto,
    dataColum:ColumnDescriptor[],
    ordenProduccion: OrdenProduccion
  ) => {
    producto.indiceProducto = ordenProduccion.ordenesProduccion.length + 1
    const nuevoOrdenProduccion = {
      ...ordenProduccion,
      ordenesProduccion: [...ordenProduccion.ordenesProduccion, producto]
    }

    setOrdenProduccion(nuevoOrdenProduccion)
    const serializeObj = JSON.stringify(dataColum)
    setDatosLocalStorage("datosTemporales", serializeObj)
    agregarNuevoProductoOP(ordenProduccion.idParte, producto)
  }

  const actualizarDatos = (
    datos: ColumnDescriptor[],
    ordenProduccion: OrdenProduccion
  ) => {

    if (ordenProduccion) {
      const producto = datos || ProductoInicial
      producto[0].value = ordenProduccion.idParte
      producto[0].defaultValue = ordenProduccion.idParte

      //console.log(ProductoInicial,producto)
      const mappedProducto = mapColumnDescriptors(ProductoInicial, producto, [
       
      ])

      const indexedProduct = incrementarIndiceProductos(
        ordenProduccion.ordenesProduccion
      )

      setDatosColumna(mappedProducto)
      //updateOrdenProduccion(ordenProduccion)
      //setListaProductosOrdenReciente(indexedProduct)
      setListaTotalProduccion(indexedProduct)
      const serializeObj = JSON.stringify(mappedProducto)
      setDatosLocalStorage("datosTemporales", serializeObj)
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
      //console.log(value)
      const currentData = recuperarDatosTemporales()

      if (currentData) {
        const dataUpdated = updateColumnProduct(
          currentData,
          id,
          value,
          ParteLaminacion
        )

        if (dataUpdated) {
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
          //console.log(dataUpdated)
          setDatosColumna(dataUpdated)
        }
      }
    }
  }

  const handleButtonClick = (idInput: string | number, rowIndex: number) => {
    const id = typeof idInput === "number" ? idInput.toString() : idInput

    if (id.toLowerCase() === "agregar") {
      const productoActual = recuperarDatosTemporales()

      if (ordenProduccion) {
        const productoParaMapear = productoActual
          ? productoActual
          : ProductoInicial
        const indiceProducto = ordenProduccion.ordenesProduccion.length + 1
        const mappedProduct = mapearYConfigurarProducto(
          productoParaMapear,
          ordenProduccion.idParte,
          indiceProducto,
          ordenProduccion.fecha,
          ordenProduccion.TipoGoma,
          ordenProduccion.bamburi,
          ["Agregar", "editar"]
        )

        const gestionarOrdenProduccion = () => {
          actualizarYAgregarProducto(mappedProduct,productoParaMapear,ordenProduccion)
        }

        //comprobamos que si existe una ordenProduccion ya creada
        if (!hasOrdenProduct) {
          //si no existe la creamos
          crearNuevaOrdenProduccion(ordenProduccion)
            .then((response) => {
              if (response?.status === 200) {
                //agregamos nueva linea produccion
                gestionarOrdenProduccion()
                //modificamos el estado porque la orden de produccion ha sido creada
                setHasOrdenProduct(true)
              } else {
                console.error("Error al crear la orden de producción")
              }
            })
            .catch((error) => {
              console.error("Error al crear la orden de producción:", error)
            })
        } else {
          //agregamos directamente, ya hemos creado una OrdenProduccion nueva linea produccion
          gestionarOrdenProduccion()
        }
      } else {
        console.log("No hay orden de producción definida")
      }
    } else if (id.toLowerCase() === "editar") {
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

      /*
      if (datosLineaMod) {

        if (ordenProduccion) {
          const convertProduct = mapColumnDescriptorsToProducto(
            datosLineaMod,
            ordenProduccion.idParte
          )

          convertProduct.fecha = ordenProduccion.fecha
          convertProduct.tipoGoma = ordenProduccion.TipoGoma
          //modifico el producto de la ordenProduccion
          ordenProduccion.ordenesProduccion =
            ordenProduccion.ordenesProduccion.map((product) => {
              if (product.indiceProducto === convertProduct.indiceProducto) {
                return convertProduct
              }
              return product
            })

          //updateProductInOrden(convertProduct, ordenProduccion.idParte)
          updateOrdenProduccion(ordenProduccion).then((response) => {
            if (response) {
              //console.log(response)
              setOrdenProduccion(ordenProduccion)
              
              setListaTotalProduccion(ordenProduccion.ordenesProduccion)
            }
          })

          setEditMode(false)
        }
      }
      */

      if (datosLineaMod && ordenProduccion) {

        const productoModificado = mapearYConfigurarProducto(
          datosLineaMod,
          rowIndex,
          ordenProduccion.idParte,
          ordenProduccion.fecha,
          ordenProduccion.TipoGoma,
          []
        )

        const ordenActualizada = actualizarProductoEnOrden(
          productoModificado,
          ordenProduccion
        )

        updateOrdenProduccion(ordenActualizada).then((response) => {
          if (response) {
            setOrdenProduccion(ordenActualizada)
            setListaTotalProduccion(ordenActualizada.ordenesProduccion)
          }
        })

        setEditMode(false)
      }
    } else if (id.toLowerCase() === "borrar") {
      console.log(listaTotalProduccion[rowIndex])
      setResumeDataProduct(listaTotalProduccion[rowIndex])
      navigate(
        `/ordenProduccion/${listaTotalProduccion[rowIndex].idParte}/productos/${listaTotalProduccion[rowIndex].indiceProducto}`
      )
      handleOpenModal()
    }
  }

  const handleDeleteProducto = (
    e: React.MouseEvent<HTMLButtonElement>,
    idInput: string | number | undefined
  ) => {
    if (idInput === "btDelete") {
      //console.log(productoActual)
      if (ordenProduccion && resumeProduct) {
        deleteOrdenProducion(
          ordenProduccion.idParte,
          resumeProduct.indiceProducto
        ).then((response) => {
          if (response.success) {
            //console.log(response.message)
            setIsOpen(false)
          } else {
            console.log(response.message)
          }
        })
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
    console.log()
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
      if (ordenProduccion?.ordenesProduccion) {
        filterByWords(
          ordenProduccion?.ordenesProduccion,
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
    if (idToggle === "orden01") {
      setOrdenData(toggleState.value)

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
    setResumeDataProduct,
    handleIsOpen,
    handleCloseModal,
    handleOpenModal,
    setDatosColumna,
    setDatosLineaMod,
    setOrdenProduccion,
    setOrdenData,
    setEditMode,
    // setListaProductosOrdenReciente,
    setLoadedData,
    calculateItemToDisplay,
    loadMoreData,
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
    handleButtonClick,
    handleDeleteProducto
  }
}

export default useOrdenProduccionManager
