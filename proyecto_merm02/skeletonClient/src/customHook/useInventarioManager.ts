import { useState } from "react"
import {
  InventarioAlmacen,
  ProductoInventario,
  PrepareDataInventario
} from "../interfaces/Inventario"
import { useInventarioData } from "../customHook/useInventarioData"
import { setDatosLocalStorage, getDatosLocalStorage } from "../utilidades/util"
import { obtenerFechaActual } from "../utilidades/dateUtil"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { useNavigate } from "react-router-dom" // Importa useNavigate
import useInfiniteLoaderInventario from "../components/InfiniteLoaderComponent/useInfiniteLoaderInventario"
import { PlantillaProductoInventario } from "../models/PlantillaProductoInventario"
import { ProducInventarioModificacion } from "../models/ProductoInventarioModificacion"
import { ProductoInventarioEntradasMod } from "../models/ProductoInventarioEntradasMod"
import { ProductoInventarioSalidasMod } from "../models/ProductoInventarioSalidasMod"
import { ResumenProductoInventario } from "../models/ResumenProductoInventario"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import useModal from "../components/modal/useModal"
import { DateFilterProps } from "../components/customDatePicker/DateFilterProps"
import { IcustomSelectProp } from "../components/selectComponent/IcustomSelectProp"
import { ItextInputFilter } from "../components/inputTextFilterComponent/ItextInputFilter"
import { ItoggleProps } from "../components/toggle/ItoggleProps"
import useFilterData from "../components/filters/useFilterData"
import useCustomDatepicker from "../customHook/useCustomDatepicker"
import { TableStyle } from "../interfaces/TableStyles"

export const useInventarioManager = () => {

  const [resumeProduct, setResumeDataProduct] =
    useState<ProductoInventario>(null)
  const navigate = useNavigate() // Obtén la función navigate
  const { totalProductosInventario, setListaTotalProductosInventario } =
    useOrdenProductionStore()
  const [lastProductInventario, setLastProductInventario] =
    useState<ProductoInventario[]>()
  const [url, setUrl] = useState<string>()
  const { isOpen, setIsOpen, openModal, closeModal } = useModal()
  const [editMode, setEditMode] = useState<boolean>(false)
  const { filterByWords, filterData, filterDateRange } = useFilterData()
  const [fullData, setFullData] = useState<ProductoInventario[]>([])
  const [ordenData, setOrdenData] = useState<"asc" | "desc">("desc")
  const [mostrarData, setMostrarData] = useState<boolean>(false)

  const [mappeddProductosInventario, setMappedProductosInventario] =
    useState<ColumnDescriptor[][]>()
  const [mappedStyleTable,setmappedStyleTable] = useState<TableStyle[]>()
  const [listadoTitulosPropiedades, setListadoTitulosPropiedades] = useState<
    string[]
  >([
    "fechaEntrada",
    "fechaSalida",
    "dibujo",
    "color",
    "acabado01",
    "acabado02",
    "molde",
    "planchas",
    "cantidadEntrante",
    "cantidadSalida",
    "clalibre",
    "stock"
  ])

  const [selectPropiedades, setSelectedPropiedades] = useState<string>(
    listadoTitulosPropiedades[0]
  )

  const {
    getInventarioSelected,
    crearNuevoInventario,
    updateProductoIventario,
    updateInventario,
    getLastProductGroupInventario,
    mapearProductoInventarioAColumnas,
    mapColumnDescriptorsToProductoInventario,
    generarMatrizColumnDescriptors,
    updateColumnDescriptor,
    getLastproductInventario,
    deleteLineaInventario,
    getLastProductInventarioByClaveComp,
    generarMatrizStyle,
    allProductsByClaveComp,
    productoInventarioInicial
  } = useInventarioData()

  const {
    currentPage,
    itemsPerPage,
    loadedData,
    setLoadedData,
    calculateItemToDisplay,
    loadMoreData
  } = useInfiniteLoaderInventario(20)

  const [datosEntrada, setEntrada] = useState<ColumnDescriptor[]>(
    productoInventarioInicial
  )
  const [datosModificacion, setDatosModificacion] = useState<
    ColumnDescriptor[]
  >(ProducInventarioModificacion)

  const handleInputChange = (value: string | number, id: any) => {
    console.log(value, id)

    const updateDataColumnDescriptor = updateColumnDescriptor(
      datosEntrada,
      id,
      value,
      productoInventarioInicial
    )

    if (updateDataColumnDescriptor) {
      setEntrada(updateDataColumnDescriptor)
      setDatosLocalStorage("tempDataEntrada", updateDataColumnDescriptor)
    }

    if (editMode) {
      const updateDataColumnEditDescriptor = updateColumnDescriptor(
        datosModificacion,
        id,
        value,
        ProducInventarioModificacion
      )

      if (updateDataColumnEditDescriptor)
        setDatosModificacion(updateDataColumnEditDescriptor)
    }

    //ProducInventarioModificacion

    //console.log(updateDataColumnDescriptor)
  }

  const handleBackEditMod = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEditMode(false)
  }

  const handleOpenModal = () => {
    console.log("Open Modal")
    openModal()
  }

  const handleCloseModal = () => {
    closeModal()
  }

  const handleButtonClick = async (
    idInput: string | number,
    rowIndex: number
  ) => {
    const dataPrepareInventario = getDatosLocalStorage(
      "futureInventario"
    ) as PrepareDataInventario

    if (idInput === "agregarEntrada") {

      if (dataPrepareInventario) {

        try {

          const mapDatosEntrada = mapColumnDescriptorsToProductoInventario(
            datosEntrada,
            ["agregarEntrada"]
          )

          //console.log(mapDatosEntrada)

          const dbInventario = (await getInventarioSelected(
            dataPrepareInventario.url
          )) as InventarioAlmacen

          //obtenemos todos los productos que coincidan con la claveCompuesta          
          const claveCompuesta = generadorClaveCompuesta(mapDatosEntrada)

          //relllenamos fechas y hora de salida
          mapDatosEntrada.fechaEntrada = obtenerFechaActual(
            "dd/MM/yyyy HH:mm:ss"
          )
          mapDatosEntrada.fechaSalida = obtenerFechaActual(
            "dd/MM/yyyy HH:mm:ss"
          )

          if (dbInventario) {

            mapDatosEntrada.claveComp = claveCompuesta
           // console.log("claveCompleta", mapDatosEntrada.claveComp)
            const lastProductExist = getLastProductInventarioByClaveComp(
              dbInventario,
              mapDatosEntrada.claveComp
            )

            const lastProduct = getLastproductInventario(dbInventario)
            mapDatosEntrada.idProducto = lastProduct.idProducto + 1

            if (lastProductExist) {
              //en este caso obtenemos el ultimo producto que coincida con la clave compuesta

              mapDatosEntrada.stock =
                mapDatosEntrada.cantidadEntrante + lastProductExist.stock
              mapDatosEntrada.ultimoRegistro = true 
              lastProductExist.ultimoRegistro = false
              //console.log("stock cantidad existente", mapDatosEntrada.stock)
            } else {
              // si no hay coincidencia es que el producto es nuevo
              mapDatosEntrada.stock = mapDatosEntrada.cantidadEntrante
              mapDatosEntrada.ultimoRegistro=true
            }

            dbInventario.inventario.push(mapDatosEntrada)
            //actualizamos inventario con los nuevos datos

            updateProductoIventario(
              `${dataPrepareInventario.url}/${mapDatosEntrada.idProducto}`,
              dbInventario
            ).then((response) => {
              if (response) {
                dataPrepareInventario.inventarioAlmacen = dbInventario
                setDatosLocalStorage("futureInventario", dataPrepareInventario)
                setListaTotalProductosInventario(dbInventario.inventario)
                const mappedData = generarMatrizColumnDescriptors(
                  PlantillaProductoInventario,
                  dbInventario.inventario,
                )
                setMappedProductosInventario(mappedData)
              }
            })

          } else {
            // El inventario no existe, creamos
            mapDatosEntrada.idProducto = 1
            mapDatosEntrada.claveComp = generadorClaveCompuesta(mapDatosEntrada)
            //la cantidad de stock al iniciar es lo mismo que la cantidad entrante inicial
            mapDatosEntrada.stock = mapDatosEntrada.cantidadEntrante
            mapDatosEntrada.ultimoRegistro=true

            //console.log("mapeodatos", mapDatosEntrada)

            const nuevoInventario = {
              seccion: dataPrepareInventario.inventarioAlmacen.seccion,
              almacen: dataPrepareInventario.inventarioAlmacen.almacen, // Asegúrate de que esto sea correcto
              inventario: [mapDatosEntrada]
            }

            const creacionExitosa = await crearNuevoInventario(
              dataPrepareInventario.url,
              nuevoInventario
            )

            if (creacionExitosa) {
              console.log(
                "Se ha creado un nuevo inventario con la entrada",
                nuevoInventario
              )
              dataPrepareInventario.inventarioAlmacen = nuevoInventario
              setDatosLocalStorage("futureInventario", dataPrepareInventario)
              setListaTotalProductosInventario(nuevoInventario.inventario)
              setListaTotalProductosInventario(nuevoInventario.inventario)
                const mappedData = generarMatrizColumnDescriptors(
                  PlantillaProductoInventario,
                  nuevoInventario.inventario,
                )
                setMappedProductosInventario(mappedData)
            }
          }

          actualizaInvinterario()
        } catch (error) {
          console.error("Error en handleButtonClick:", error)
        }
      }
    } else if (idInput === "Borrar") {
      //setResumeDataProduct(listaTotalProduccion[rowIndex])
      const dataInventarioTemp = getDatosLocalStorage(
        "futureInventario"
      ) as PrepareDataInventario
      //console.log(dataInventarioTemp.url + "/producto/" + rowIndex)
      navigate(`${dataInventarioTemp.url}/${rowIndex}`, {
        replace: true
      })
      setResumeDataProduct(totalProductosInventario[rowIndex])
      handleOpenModal()
    } else if (idInput === "Editar") {

      if (loadedData) {
        /*const productoEditar = mapearProductoInventarioAColumnas(
          ProducInventarioModificacion,
          loadedData[rowIndex]
        )
        setDatosModificacion(productoEditar)
        setEditMode(true)*/
      }

    } else if (idInput === "entradas") {
      // console.log("entradas")
      if (loadedData) {
        const productoEditar = mapearProductoInventarioAColumnas(
          ProductoInventarioEntradasMod,
          loadedData[rowIndex]
        )
        setDatosModificacion(productoEditar)
        setEditMode(true)
      }
    } else if (idInput === "salidas") {
      //console.log("salidas")
      if (loadedData) {
        const productoEditar = mapearProductoInventarioAColumnas(
          ProductoInventarioSalidasMod,
          loadedData[rowIndex]
        )
        setDatosModificacion(productoEditar)
        setEditMode(true)
      }
    } else if (idInput === "guardar") {

      //GUARDAR PRODUCTO EDITADO
      const dbInventario = (await getInventarioSelected(
        dataPrepareInventario.url
      )) as InventarioAlmacen

      const mapDatosEntrada = mapColumnDescriptorsToProductoInventario(
        datosModificacion,
        ["guardar"]
      ) as ProductoInventario

      if (dbInventario) {
        //dbInventario.inventario[mapDatosEntrada.idProducto] =  mapDatosEntrada
        const index = dbInventario.inventario.findIndex(
          (producto) => producto.idProducto === mapDatosEntrada.idProducto
        )

        dbInventario.inventario[index] = mapDatosEntrada

        updateProductoIventario(
          `${dataPrepareInventario.url}/${mapDatosEntrada.idProducto}`,
          dbInventario
        ).then((result) => {
          if (result) {
            setDatosLocalStorage("futureInventario", dbInventario)
            setListaTotalProductosInventario(dbInventario.inventario)
            setEditMode(false)
          } else {
            console.log("error")
          }
        })
      }
    }
  }

  const prepareDataInventarioEntradas = async (
    url: string,
    seccion: string,
    naveSeleccionada: string
  ) => {
    
    const dataInventario = {
      url: url,
      inventarioAlmacen: {
        seccion: seccion,
        almacen: naveSeleccionada,
        inventario: []
      }
    } as PrepareDataInventario

    const response = await getInventarioSelected(url)
    setUrl(url)

    if (response) {

      if (response.inventario) {
        // Recibo respuesta porque el inventario ya existe
        dataInventario.inventarioAlmacen.inventario = response.inventario
      }

    }

    setDatosLocalStorage("futureInventario", dataInventario)
    setListaTotalProductosInventario(
      dataInventario.inventarioAlmacen.inventario
    )

    return dataInventario
  }

  const handleDeleteProducto = (
    e: React.MouseEvent<HTMLButtonElement>,
    idInput: string | number | undefined
  ) => {
    if (idInput === "btDelete") {
      const dataPrepareInventario = getDatosLocalStorage(
        "futureInventario"
      ) as PrepareDataInventario

      if (dataPrepareInventario) {
        deleteLineaInventario(
          dataPrepareInventario.url,
          resumeProduct.idProducto
        ).then((response) => {
          if (response) {
            console.log(
              "el producto se ha eliminadocon exito ",
              dataPrepareInventario.url
            )
            // navigate(dataPrepareInventario.url)
            actualizaInvinterario()
            closeModal()
          }
        })
      }
    }
  }

  const actualizaInvinterario = async () => {

    const datosTemporales = getDatosLocalStorage(
      "futureInventario"
    ) as PrepareDataInventario

    try {

      const responseInventario = await getInventarioSelected(
        datosTemporales.url
      )
      
      const responseUltimosProductos = await getLastProductGroupInventario(
        datosTemporales.url,
        "entrada"
      )

      setDatosLocalStorage("groupProducts", responseUltimosProductos)

      if (responseUltimosProductos) {
        setLastProductInventario(responseUltimosProductos)
      }

      // Ahora puedes asegurarte de que ambos arrays están disponibles
      if (
        responseInventario &&
        responseInventario.inventario &&
        responseUltimosProductos
      ) {

        const mappedData = generarMatrizColumnDescriptors(
          PlantillaProductoInventario,
          responseInventario.inventario,
        )


        if (responseInventario && responseInventario.inventario) {
          
          datosTemporales.inventarioAlmacen.inventario =
            responseInventario.inventario
          setDatosLocalStorage("futureInventario", datosTemporales)
          setListaTotalProductosInventario(responseInventario.inventario)
          setFullData(responseInventario.inventario)
          setMappedProductosInventario(mappedData)

          const mappedStyle = generarMatrizStyle(responseInventario.inventario)
          setmappedStyleTable(mappedStyle)

        } else {
          console.log("La base de datos no contiene inventario con esa definición")
        }
        
      }
    } catch (error) {
      console.error("Error al actualizar el inventario:", error)
    }
  }

  const generadorClaveCompuesta = (producto: ProductoInventario) => {
    const compClave = `${producto.plancha}-${producto.molde}-${producto.dibujo}-${producto.color}-${producto.calibre}-${producto.acabado01}-${producto.acabado02}`
    return compClave
  }

  const validateDates = (startDate: Date, endDate: Date) => {
    if (startDate && endDate) {
      if (startDate <= endDate) {
        if (fullData) {
          filterDateRange(
            fullData,
            "fechaEntrada",
            startDate,
            endDate,
            ordenData
          ).then((result) => {
            //console.log(result.length)
            setListaTotalProductosInventario(result)
          })
        }
      }
    }
  }

  // Hook para la fecha 'Desde'
  const {
    selectedDate: selectedStartDate,
    changeSelectedDate: changeSelectedStartDate
  } = useCustomDatepicker(new Date(), {
    onSelectedDateChanged: (date: Date) => {
      validateDates(date, selectedEndDate)
    }
  })

  // Hook para la fecha 'Hasta'
  const {
    selectedDate: selectedEndDate,
    changeSelectedDate: changeSelectedEndDate
  } = useCustomDatepicker(new Date(), {
    onSelectedDateChanged: (date: Date) => {
      validateDates(selectedStartDate, date)
    }
  })

  //MANEJADORES EVENTOS
  const handleInputTextChange = () => {}

  const handleInputTextClick = () => {}

  const handleFilterChange = (id: string, value: string) => {

    if (id === "byWords") {
      if (value === "") {
        setListaTotalProductosInventario(fullData)
      } else {
        filterByWords(
          totalProductosInventario,
          value,
          selectPropiedades,
          "asc"
        ).then((result) => {
          //setListaProductosOrdenReciente(result)
          //setListaTotalProduccion(result)
          console.log("entro :", result)
          setListaTotalProductosInventario(result)
        })
      }
    }
  }

  //manejador del togle
  const handleToggleChange = (
    idToggle: string,
    toggleState: {
      value: boolean
      sortDirection: "asc" | "desc"
    }
  ) => {
    if (idToggle === "Orden") {
      setOrdenData(toggleState.sortDirection)
      // if (listadoTitulosPropiedades) {
      filterData(
        totalProductosInventario,
        selectPropiedades,
        toggleState.sortDirection
      ).then((result) => {
        console.log(result)
        setListaTotalProductosInventario(result)
      })
      //}
      // Puedes realizar acciones adicionales basadas en el estado del toggle
    } else if (idToggle === "Mostrar") {
      const dataPrepareInventario = getDatosLocalStorage(
        "futureInventario"
      ) as PrepareDataInventario

      if (dataPrepareInventario) {

        try {

          if (toggleState.value) {

           /*
            const groupProducts = getDatosLocalStorage(
              "groupProducts"
            ) as ProductoInventario[]

            const mappedData = generarMatrizColumnDescriptors(
              PlantillaProductoInventario,
              groupProducts,
              groupProducts
            )

            console.log("Sincrona: ",mappedData,groupProducts)
            setMappedProductosInventario(mappedData)
            setListaTotalProductosInventario(groupProducts)
            */

           getLastProductGroupInventario(
              dataPrepareInventario.url,
              "entrada"
            ).then((result) => {

              if (result) {

              /*  const mappedData = generarMatrizColumnDescriptors(
                  PlantillaProductoInventario,
                  result,
                  result
                )

                setMappedProductosInventario(mappedData)*/
                setListaTotalProductosInventario(result)
              }
            })
        
          } else {

            //console.log("Aqui devolveriamos todos los productos")
             getInventarioSelected(dataPrepareInventario.url).then(

              (inventario) => {

                if (inventario) {

                /*  const ultimasEntradasSalidas = getDatosLocalStorage("groupProducts")

                  const mappedData = generarMatrizColumnDescriptors(
                    PlantillaProductoInventario,
                    inventario.inventario,
                    ultimasEntradasSalidas
                  )
  
                  setMappedProductosInventario(mappedData)*/
                 //console.log(inventario.inventario)
                  setListaTotalProductosInventario(inventario.inventario)
                }
              }
            )
          }
        } catch (error) {
          console.error("Error al obtener los productos:", error)
        }
      }

      //console.log("ver solo ultima entrada del producto", mostrarData)
    }

  }

  /*
  const mostrarTodosInventario = ()=>{

  }
  */

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedPropiedades(value) // Actualiza el estado con el valor seleccionado
  }

  // Opcional: Maneja el filtro si es necesario
  const handleFilter = (filterValue: string) => {
    console.log("Filtrar valores por:", filterValue)
    // Implementar lógica de filtrado aquí si es necesario
    filterData(totalProductosInventario, filterValue, "asc").then((result) => {
      // setListaProductosOrdenReciente(result)
      //setListaTotalProduccion(result)
      setListaTotalProductosInventario(result)
    })
  }

  const plantillaFiltersInventario = [
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
      idInput: "selectedStartDate",
      activeLabel: true,
      type: "date",
      language: "ES",
      formTarget: "dd/MM/yyyy",
      labelClearButton: "Limpar",
      name: "selectedStartDate",
      onSelectedDateChanged: changeSelectedStartDate
    } as DateFilterProps,
    {
      idInput: "selectedEndDate",
      activeLabel: true,
      type: "date",
      language: "ES",
      formTarget: "dd/MM/yyyy",
      labelClearButton: "Limpar",
      name: "selectedEndDate",
      onSelectedDateChanged: changeSelectedEndDate
    } as DateFilterProps,
    {
      idInput: "Orden",
      type: "toggle",
      activeLabel: true,
      valueProp: ordenData || true,
      trueText: "asc",
      falseText: "desc",
      onChange: handleToggleChange
    } as ItoggleProps,
    {
      idInput: "Mostrar",
      type: "toggle",
      activeLabel: true,
      valueProp: ordenData || true,
      trueText: "unico",
      falseText: "multiple",
      onChange: handleToggleChange
    } as ItoggleProps
    // Puedes agregar más filtros según necesites
  ]

  return {
    handleInputChange,
    handleButtonClick,
    crearNuevoInventario,
    prepareDataInventarioEntradas,
    setLoadedData,
    calculateItemToDisplay,
    actualizaInvinterario,
    loadMoreData,
    handleOpenModal,
    handleCloseModal,
    setIsOpen,
    handleDeleteProducto,
    handleBackEditMod,
    changeSelectedStartDate,
    changeSelectedEndDate,
    mappedStyleTable,
    mappeddProductosInventario,
    plantillaFiltersInventario,
    selectedStartDate,
    datosModificacion,
    ResumenProductoInventario,
    resumeProduct,
    isOpen,
    editMode,
    currentPage,
    itemsPerPage,
    loadedData,
    datosEntrada
  }
}
