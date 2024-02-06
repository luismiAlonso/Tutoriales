import { useState } from "react"
import {
  InventarioAlmacen,
  ProductoInventario,
  PrepareDataInventario
} from "../interfaces/Inventario"
import { useInventarioData } from "./useInventarioData"
import { setDatosLocalStorage, getDatosLocalStorage } from "../utilidades/util"
import { obtenerFechaActual } from "../utilidades/dateUtil"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { useNavigate } from "react-router-dom" // Importa useNavigate
import useInfiniteLoaderInventario from "../components/InfiniteLoaderComponent/useInfiniteLoaderInventario"
import { PlantillaProductoInventario } from "../models/PlantillaProductoInventario"
import { ProducInventarioModificacion } from "../models/ProductoInventarioModificacion"
import { ProductoInventarioListadoModificacion } from "../models/ProductoInventarioListadoModificacion"
import { ProductoInventarioSalidasMod } from "../models/ProductoInventarioSalidasMod"
import { ProductoInventarioEntradasMod } from "../models/ProductoInventarioEntradasMod"
import { ResumenProductoInventario } from "../models/ResumenProductoInventario"
import { plantillaProductoInventarioListado } from "../models/plantillaProductoInventarioListado"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import useModal from "../components/modal/useModal"
import { DateFilterProps } from "../components/customDatePicker/DateFilterProps"
import { IcustomSelectProp } from "../components/selectComponent/IcustomSelectProp"
import { ItextInputFilter } from "../components/inputTextFilterComponent/ItextInputFilter"
import { ItoggleProps } from "../components/toggle/ItoggleProps"
import useFilterData from "../components/filters/useFilterData"
import useCustomDatepicker from "./useCustomDatepicker"
import { TableStyle } from "../interfaces/TableStyles"
import {
  crearIndiceAlmacen,
  obtenerIndiceActualAlmacen
} from "../api/variablesGlobalesApi"

export const useInventarioListadoManager = () => {
  const [resumeProduct, setResumeDataProduct] =
    useState<ProductoInventario | null>(null)
  const navigate = useNavigate() // Obtén la función navigate
  const { totalProductosInventario, setListaTotalProductosInventario } =
    useOrdenProductionStore()
  const [, setUrl] = useState<string>("")
  const { isOpen, setIsOpen, openModal, closeModal } = useModal()
  const [editMode, setEditMode] = useState<boolean>(false)
  const [tipoEdicion, setTipoEdicion] = useState<string>("")

  const { filterByWords, filterData, filterDateRange } = useFilterData()
  const [fullData, setFullData] = useState<ProductoInventario[]>([])
  const [ordenData, setOrdenData] = useState<"asc" | "desc">("desc")
  const [registroSeleccionado, setRegistroSeleccionado] =
    useState<ProductoInventario>()
  const [mappeddProductosInventario, setMappedProductosInventario] =
    useState<ColumnDescriptor[][]>()
  const [mappedStyleTable, setmappedStyleTable] = useState<TableStyle[]>()
  const [listadoTitulosPropiedades] = useState<string[]>([
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
    // updateInventario,
    getLastProductGroupInventario,
    mapearProductoInventarioAColumnas,
    mapColumnDescriptorsToProductoInventario,
    generarMatrizColumnDescriptors,
    updateColumnDescriptor,
    // getLastproductInventario,
    // deleteLineaInventario,
    getAllInvetariosAlmacen,
    deleteByClaveComp,
    getLastProductInventarioByClaveComp,
    generarMatrizStyle
  } = useInventarioData()

  const {
    currentPage,
    itemsPerPage,
    loadedData,
    setLoadedData,
    calculateItemToDisplay,
    loadMoreData
  } = useInfiniteLoaderInventario(20)

  const [datosEntrada] = useState<ColumnDescriptor[]>(
    ProductoInventarioListadoModificacion
  )

  const [datosModificacion, setDatosModificacion] = useState<
    ColumnDescriptor[]
  >(ProducInventarioModificacion)

  const handleInputChange = (value: string | number, id: any) => {
    //console.log(value, id)
    if (editMode) {
      const updateDataColumnEditDescriptor = updateColumnDescriptor(
        datosModificacion,
        id,
        value,
        ProductoInventarioListadoModificacion
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
          agregarEntrada(mapDatosEntrada)
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
      //Por elmomento no permitimos editar
      if (loadedData) {
        /*const productoEditar = mapearProductoInventarioAColumnas(
          ProducInventarioModificacion,
          loadedData[rowIndex]
        )

        setDatosModificacion(productoEditar)
        setEditMode(true)*/
      }
    } else if (idInput === "entradasListado") {
      if (loadedData) {
        setTipoEdicion("entradas")
        const productoEditar = mapearProductoInventarioAColumnas(
          ProductoInventarioEntradasMod,
          totalProductosInventario[rowIndex]
        )

        setRegistroSeleccionado(totalProductosInventario[rowIndex])
        setDatosModificacion(productoEditar)
        setEditMode(true)
      }
    } else if (idInput === "salidasListado") {
      if (loadedData) {
        setTipoEdicion("salidas")
        const productoEditar = mapearProductoInventarioAColumnas(
          ProductoInventarioSalidasMod,
          totalProductosInventario[rowIndex]
        )
        setRegistroSeleccionado(totalProductosInventario[rowIndex])
        setDatosModificacion(productoEditar)
        setEditMode(true)
      }
    } else if (idInput === "guardar") {
      //GUARDAR PRODUCTO EDITADO

      const mapDatosEntrada = mapColumnDescriptorsToProductoInventario(
        datosModificacion,
        ["guardar"]
      ) as ProductoInventario

      if (registroSeleccionado) {
        mapDatosEntrada.seccion = registroSeleccionado.seccion
        mapDatosEntrada.almacen = registroSeleccionado.almacen
      }

      if (tipoEdicion === "entradas") {
        agregarEntrada(mapDatosEntrada)
      } else if (tipoEdicion === "salidas") {
        agregarSalida(mapDatosEntrada)
      }

      setEditMode(false)
    }
  }

  const agregarSalida = async (mapDatosSalida: ProductoInventario) => {
    const url = `EntradasInventarioPage/${mapDatosSalida.seccion}/${mapDatosSalida.almacen}`

    const dbInventario = (await getInventarioSelected(url)) as InventarioAlmacen

    mapDatosSalida.fechaSalida = obtenerFechaActual("dd/MM/yyyy HH:mm:ss")

    if (dbInventario) {
      //obtenemos todos los productos que coincidan con la claveCompuesta
      const claveCompuesta = generadorClaveCompuesta(mapDatosSalida)

      mapDatosSalida.claveComp = claveCompuesta
      // console.log("claveCompleta", mapDatosEntrada.claveComp)
      const lastProductExist = getLastProductInventarioByClaveComp(
        dbInventario,
        mapDatosSalida.claveComp
      )

      //const lastProduct = getLastproductInventario(dbInventario)
      //dbInventario.inventario.length + 1 /*lastProduct.idProducto + 1*/

      if (lastProductExist) {
        //en este caso obtenemos el ultimo producto que coincida con la clave compuesta
        // console.log("la clave compuesta del producto ya existe")
        if (
          lastProductExist.producto.stock - mapDatosSalida.cantidadSalida <
          0
        ) {
          return
        }

        mapDatosSalida.stock =
          lastProductExist.producto.stock - mapDatosSalida.cantidadSalida
        mapDatosSalida.ultimoRegistro = true
        lastProductExist.producto.ultimoRegistro = false
        //console.log("stock cantidad existente", mapDatosEntrada.stock)
        dbInventario.inventario.splice(
          lastProductExist.indice + 1,
          0,
          mapDatosSalida
        )
      }

      //actualizamos inventario con los nuevos datos
      updateProductoIventario(
        `${url}/${mapDatosSalida.idProducto}`,
        dbInventario
      ).then((response) => {
        if (response) {
          actualizaAllinventarios()
        }
      })
    }
  }

  const agregarEntrada = async (mapDatosEntrada: ProductoInventario) => {
    const url = `EntradasInventarioPage/${mapDatosEntrada.seccion}/${mapDatosEntrada.almacen}`
    const dbInventario = (await getInventarioSelected(url)) as InventarioAlmacen
    //colocamos fechas e identificamos con seccion almacen
    mapDatosEntrada.fechaEntrada = obtenerFechaActual("dd/MM/yyyy HH:mm:ss")

    if (dbInventario) {
      //obtenemos todos los productos que coincidan con la claveCompuesta
      const claveCompuesta = generadorClaveCompuesta(mapDatosEntrada)

      mapDatosEntrada.claveComp = claveCompuesta
      // console.log("claveCompleta", mapDatosEntrada.claveComp)
      const lastProductExist = getLastProductInventarioByClaveComp(
        dbInventario,
        mapDatosEntrada.claveComp
      )

      //const lastProduct = getLastproductInventario(dbInventario)
      //mapDatosEntrada.idProducto =
      //dbInventario.inventario.length + 1 /*lastProduct.idProducto + 1*/

      const indiceInventario = await obtenerIndiceActualAlmacen(
        `/indice/${mapDatosEntrada.almacen}/${mapDatosEntrada.seccion}`
      )

      if (indiceInventario) {
        mapDatosEntrada.idProducto = indiceInventario
      }

      if (lastProductExist) {
        //en este caso obtenemos el ultimo producto que coincida con la clave compuesta
        //mapDatosEntrada.cantidadSalida = 0 //reset cantidad salida
        mapDatosEntrada.stock =
          mapDatosEntrada.cantidadEntrante + lastProductExist.producto.stock
        mapDatosEntrada.ultimoRegistro = true
        lastProductExist.producto.ultimoRegistro = false
        //console.log("stock cantidad existente", mapDatosEntrada.stock)
        dbInventario.inventario.splice(
          lastProductExist.indice + 1,
          0,
          mapDatosEntrada
        )
      } else {
        // si no hay coincidencia es que el producto es nuevo
        //console.log("la clave compuesta no existe")
        mapDatosEntrada.stock = mapDatosEntrada.cantidadEntrante
        mapDatosEntrada.ultimoRegistro = true
        dbInventario.inventario.push(mapDatosEntrada)
      }
      //actualizamos inventario con los nuevos datos
      updateProductoIventario(
        `${url}/${mapDatosEntrada.idProducto}`,
        dbInventario
      ).then((response) => {
        if (response) {
          actualizaAllinventarios()
        }
      })
    } else {
      // const muestraDatos = getDatosLocalStorage("mostrarDatos")
      //no existe un inventario con esa configuracion creamos un nuevo indexador
      crearIndiceAlmacen(
        `/indice/${mapDatosEntrada.almacen}/${mapDatosEntrada.seccion}`
      )

      //if (indiceInicio) console.log(indiceInicio)

      // El inventario no existe, creamos
      mapDatosEntrada.idProducto = 1
      mapDatosEntrada.claveComp = generadorClaveCompuesta(mapDatosEntrada)
      //la cantidad de stock al iniciar es lo mismo que la cantidad entrante inicial
      mapDatosEntrada.stock = mapDatosEntrada.cantidadEntrante
      mapDatosEntrada.ultimoRegistro = true

      //console.log("mapeodatos", mapDatosEntrada)

      const nuevoInventario = {
        seccion: mapDatosEntrada.seccion,
        almacen: mapDatosEntrada.almacen, // Asegúrate de que esto sea correcto
        inventario: [mapDatosEntrada]
      }

      const creacionExitosa = await crearNuevoInventario(url, nuevoInventario)

      if (creacionExitosa) {
        setListaTotalProductosInventario(nuevoInventario.inventario)

        const mappedData = generarMatrizColumnDescriptors(
          PlantillaProductoInventario,
          nuevoInventario.inventario
        )

        setMappedProductosInventario(mappedData)
      }

      actualizaAllinventarios()
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
    e: React.MouseEvent<HTMLButtonElement>, // Primer argumento: evento de clic
    idInput?: string | number, // Segundo argumento: idInput (opcional)
    rowIndex?: number
  ) => {
    e.preventDefault() 
    console.log(rowIndex)
    if (idInput === "btDelete") {
      const dataPrepareInventario = getDatosLocalStorage(
        "futureInventario"
      ) as PrepareDataInventario

      if (dataPrepareInventario) {
        if (resumeProduct) {
          //formateamos la cadena para que no hyan problemas con caracteres estraños
          const formatClaveComp = encodeURIComponent(resumeProduct.claveComp)

          deleteByClaveComp(
            `${dataPrepareInventario.url}/completo`,
            formatClaveComp
          ).then((response) => {
            if (response) {
              console.log(
                "el producto se ha eliminadocon exito ",
                dataPrepareInventario.url
              )
              actualizaAllinventarios()
              closeModal()
            }
          })
        }
      }
    }
  }

  const actualizaAllinventarios = async () => {
    const allInventarios = await getAllInvetariosAlmacen("ListadoInventario")
    if (allInventarios) {
      // console.log(allInventarios.length)
      setDatosLocalStorage("allinventariosAlmacen", allInventarios)
      setListaTotalProductosInventario(allInventarios)
      setFullData(allInventarios)

      const mappedData = generarMatrizColumnDescriptors(
        plantillaProductoInventarioListado,
        allInventarios
      )

      setMappedProductosInventario(mappedData)

      const mappedStyle = generarMatrizStyle(allInventarios)
      setmappedStyleTable(mappedStyle)
    } else {
      console.log("no tengo nada")
    }
  }

  const generadorClaveCompuesta = (producto: ProductoInventario) => {
    const compClave = `${producto.seccion}-${producto.almacen}-${producto.plancha}-${producto.molde}-${producto.dibujo}-${producto.color}-${producto.calibre}-${producto.acabado01}-${producto.acabado02}`
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
        //console.log(result)
        setListaTotalProductosInventario(result)
      })
      //}
      // Puedes realizar acciones adicionales basadas en el estado del toggle
    } else if (idToggle === "Mostrar") {
      const url = `EntradasInventarioPage`

      //almaceno en cookies el valor
      setDatosLocalStorage("mostrarDatos", toggleState.value)

      try {
        if (toggleState.value) {
          getLastProductGroupInventario(url).then((result) => {
            if (result) {
              const mappedData = generarMatrizColumnDescriptors(
                plantillaProductoInventarioListado,
                result
              )
              setMappedProductosInventario(mappedData)
              const mappedStyle = generarMatrizStyle(result)
              setmappedStyleTable(mappedStyle)
              setListaTotalProductosInventario(result)
              setFullData(result)
            }
          })
        } else {
          //console.log("Aqui devolveriamos todos los productos")
          actualizaAllinventarios()
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error)
      }

      //console.log("ver solo ultima entrada del producto", mostrarData)
    }
  }

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedPropiedades(value) // Actualiza el estado con el valor seleccionado
  }

  // Opcional: Maneja el filtro si es necesario
  const handleFilter = (filterValue: string) => {
    //console.log("Filtrar valores por:", filterValue)
    // Implementar lógica de filtrado aquí si es necesario
    filterData(totalProductosInventario, filterValue, "asc").then((result) => {
      // setListaProductosOrdenReciente(result)
      //setListaTotalProduccion(result)
      setListaTotalProductosInventario(result)
    })
  }

  /*
export interface ItextInputFilter {
    type: string,
    idInput: string, // Asegúrate de que el nombre de la propiedad sea consistente con lo que usas en el componente
    activeButton: boolean,
    activeSearchIcon: boolean,
    placeHolder: string,
    activeLabel: boolean,
    readonly:boolean,
    style: string,
    typeFill: "search" | "text" | "number",
    // Actualiza las funciones para recibir el 'id' y el 'value'
    onChange: (id: string, value: string) => void,
    onClick: (id: string, value: string) => void,
    onFilter?: (id: string, filterValue: string) => void // Hace que onFilter también acepte el 'id'
  }
  

*/

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
      readonly: false,
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
      valueProp: false,
      trueText: "asc",
      falseText: "desc",
      onChange: handleToggleChange
    } as ItoggleProps,
    {
      idInput: "Mostrar",
      type: "toggle",
      activeLabel: true,
      valueProp: true,
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
    loadMoreData,
    handleOpenModal,
    handleCloseModal,
    setIsOpen,
    handleDeleteProducto,
    handleBackEditMod,
    changeSelectedStartDate,
    changeSelectedEndDate,
    actualizaAllinventarios,
    mappedStyleTable,
    plantillaProductoInventarioListado,
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
