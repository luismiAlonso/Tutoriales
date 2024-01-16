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
import useInfiniteLoaderParteProducion from "../components/InfiniteLoaderComponent/useInfiniteLoaderParteProducion"
import { useParams, useNavigate } from "react-router-dom" // Importa useNavigate
import useModal from "../components/modal/useModal"
import { setDatosLocalStorage, getDatosLocalStorage } from "../utilidades/util"
import { ProductoInicial } from "../models/ProductoInicial"
import { ItextInputFilter } from "../components/inputTextFilterComponent/ItextInputFilter"
import { IcustomSelectProp } from "../components/selectComponent/IcustomSelectProp"
import { ItoggleProps } from "../components/toggle/ItoggleProps"

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
  const { isOpen, setIsOpen, openModal, closeModal } = useModal()
  const navigate = useNavigate() // Obtén la función navigate

  /*const [listaProductosOrdenReciente, setListaProductosOrdenReciente] =
    useState<Producto[]>()*/
  const [ordenData, setOrdenData] = useState<"asc" | "desc">("desc")
  const [editMode, setEditMode] = useState<boolean>(false)
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

  const configurarOrdenProduccion = () => {
    const currentTempOrder = getTempCurrenOrderProduccion() //recuperamos la utima ordenProduccion de temporal
    //const currentOrder = getCurrentOrderProduccion()
    const ordenesProduccion = getAllOrdenProduction() //recuperamos todas las ordenesProduccion de BD
    if (currentTempOrder) {
      //checkeamos que tenemos datos en local
      if (ordenesProduccion) {
        //checkeamos que

        ordenesProduccion.then((response) => {
          if (response) {
            //la operacion parece que tiene exito

            if (response.length > 0) {
              //comprobamos que tenemos al menos una ordeProdcuccion creada
              const currentOrder = response[response.length - 1] //seleccionamos la ultima orden creada
              //console.log("temporal:",currentTempOrder,"bd:",currentOrder)
              if (currentOrder.idParte === currentTempOrder.idParte) {
                //comprobamos si la ultima orden de la BD coincide con la que hay en temporal
                console.log("contienen mismo id")
                setOrdenProduccion(currentOrder)
                ProductoInicial[0].value = currentOrder.idParte
                ProductoInicial[0].defaultValue = currentOrder.idParte
                setDatosColumna(ProductoInicial)
                setListaTotalProduccion(currentOrder.ordenesProduccion)
                //console.log("guardo datos mal ",response)
                const datosSerializados = JSON.stringify(response)
                localStorage.setItem("ordenesProduccion", datosSerializados)
                //guardamos ajustandonos a la plantilla
              } else {
                //console.log(currentTempOrder)
                setOrdenProduccion(currentTempOrder)
                ProductoInicial[0].value = currentTempOrder.idParte
                ProductoInicial[0].defaultValue = currentTempOrder.idParte
                setDatosColumna(ProductoInicial)
                setListaTotalProduccion(currentTempOrder.ordenesProduccion)
              }
            } else {
              //no tenemos orden en BD
              setOrdenProduccion(currentTempOrder)
              ProductoInicial[0].value = currentTempOrder.idParte
              ProductoInicial[0].defaultValue = currentTempOrder.idParte
              setDatosColumna(ProductoInicial)
            }
          } else {
            //algo ha fallado al obte
            console.log("Algo ha fallado en la obtencion de los datos")
          }
        })
      } else {
        console.log("sin orden en bd")
        setOrdenProduccion(currentTempOrder)
        ProductoInicial[0].value = currentTempOrder.idParte
        ProductoInicial[0].defaultValue = currentTempOrder.idParte
        setDatosColumna(ProductoInicial)
      }

      //updateOrdenProduccion(orden)
    } else {
      //no hay dtos en local

      if (ordenesProduccion) {
        //comobamos si existen datos en BD
        ordenesProduccion.then((response) => {
          if (response && response.length > 0) {
            const currentOrder = response[response.length - 1]
            setOrdenProduccion(currentOrder)
            ProductoInicial[0].value = currentOrder.idParte
            ProductoInicial[0].defaultValue = currentOrder.idParte
            setDatosColumna(ProductoInicial)
            setListaTotalProduccion(currentOrder.ordenesProduccion)
            //console.log("guardo datos mal ",response)
            const datosSerializados = JSON.stringify(response)
            localStorage.setItem("ordenesProduccion", datosSerializados)
          } else {
            console.log(
              "hay un error en almacenamiento temporal, no existe una orden precreada"
            )
          }
        })
      } else {
        //no tenemos nada en BD
        console.log("nada en BD ni en temporales no existe orden precreada")
      }

      //no tenemos nada almacenado en temporal
      console.log(
        "entro aqui porque no tengo o no he podido acceder al temporal"
      )
    }
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
    actualizarOrdenProduccion(mappedProduct, dataColum, ordenProduccion)
    setListaTotalProduccion(ordenProduccion.ordenesProduccion)
  }

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

  const actualizarOrdenProduccion = (
    producto: Producto,
    dataColum: ColumnDescriptor[],
    ordenProduccion: OrdenProduccion
  ) => {
    producto.indiceProducto = ordenProduccion.ordenesProduccion.length + 1
    const nuevoOrdenProduccion = {
      ...ordenProduccion,
      ordenesProduccion: [...ordenProduccion.ordenesProduccion, producto]
    }

    setOrdenProduccion(nuevoOrdenProduccion)
    setDatosLocalStorage("datosTemporales", dataColum)

    agregarNuevoProductoOP(ordenProduccion.idParte, producto).then(
      (response) => {
        if (response) {
          setDatosLocalStorage("ordenesProduccion", dataColum)
          setListaTotalProduccion(nuevoOrdenProduccion.ordenesProduccion)
        }
      }
    )
  }

  const actualizarDatos = (
    datos: ColumnDescriptor[],
    ordenProduccion: OrdenProduccion
  ) => {
    if (ordenProduccion) {
      const producto = datos || ProductoInicial

      producto[0].value = ordenProduccion.idParte
      producto[0].defaultValue = ordenProduccion.idParte

      const mappedProducto = mapColumnDescriptors(ProductoInicial, producto, [])

      const indexedProduct = incrementarIndiceProductos(
        ordenProduccion.ordenesProduccion
      )

      setDatosColumna(mappedProducto)
      //updateOrdenProduccion(ordenProduccion)
      //setListaProductosOrdenReciente(indexedProduct)
      setListaTotalProduccion(indexedProduct)
      setDatosLocalStorage("datosTemporales", mappedProducto)
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
          setDatosLocalStorage("datosTemporales", dataUpdated)
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
          setDatosLocalStorage("datosTemporales", dataUpdated)
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

        //no agrega a la ordenProduccion
        const gestionarOrdenProduccion = () => {
          actualizarYAgregarProducto(
            mappedProduct,
            productoParaMapear,
            ordenProduccion
          )
        }

        //comprobamos que si existe una ordenProduccion ya creada
        getAllOrdenProduction().then((resp) => {
          if (resp && resp.length > 0) {
            const currentOrdenDB = resp[resp.length - 1]
            //console.log(currentOrdenDB.idParte,ordenProduccion.idParte)
            if (currentOrdenDB.idParte === ordenProduccion.idParte) {
              gestionarOrdenProduccion()
              //console.log("entro mientras son iguales")
            } else {
              crearNuevaOrdenProduccion(ordenProduccion).then((response) => {
                if (response?.status === 200) {
                  //agregamos nueva linea produccion
                  //console.log("he agregado una nueva orden de Produccion")
                  gestionarOrdenProduccion()
                  //modificamos el estado porque la orden de produccion ha sido creada
                } else {
                  console.error("Error al crear la orden de producción")
                }
              })
            }
          } else {
            crearNuevaOrdenProduccion(ordenProduccion)
              .then((response) => {
                if (response?.status === 200) {
                  //agregamos nueva linea produccion
                  //console.log("he agregado una nueva orden de Produccion")
                  gestionarOrdenProduccion()
                  //modificamos el estado porque la orden de produccion ha sido creada
                } else {
                  console.error("Error al crear la orden de producción")
                }
              })
              .catch((error) => {
                console.error("Error al crear la orden de producción:", error)
              })
          }
        })
      } else {
        console.log("No hay orden de producción definida")
      }
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
          //console.log(ordenProduccion)
          updateOrdenProduccion(ordenProduccion).then((response) => {
            if (response) {
              setOrdenProduccion(ordenProduccion)
              setListaTotalProduccion(ordenProduccion.ordenesProduccion)
            }
          })

          setEditMode(false)
        }
      }

      /* if (datosLineaMod && ordenProduccion) {

          console.log(datosLineaMod)
          
        const productoModificado = mapearYConfigurarProducto(
          datosLineaMod,
          ordenProduccion.idParte,
          rowIndex,
          ordenProduccion.fecha,
          ordenProduccion.TipoGoma,
          ordenProduccion.bamburi,
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
      }*/
    } else if (id.toLowerCase() === "borrar") {
      console.log(listaTotalProduccion[rowIndex])
      //setResumeDataProduct(listaTotalProduccion[rowIndex])
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
    if (idToggle === "orden01") {
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
      valueProp: ordenData || true,
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
