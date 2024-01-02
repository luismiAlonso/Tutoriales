import { useState } from "react"
import useFilterData from "../components/filters/useFilterData"
import { useOrdenProduccionData } from "./useOrdenProduccionData"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { ProductoModificacion } from "../models/ProductoModificacion"
import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion"
import useCustomDatepicker from "../customHook/useCustomDatePicker"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import useInfiniteLoader from "../components/InfiniteLoaderComponent/useInfiniteLoader"
import { ItextInputFilter } from "../components/inputTextFilterComponent/ItextInputFilter"
import { IcustomSelectProp } from "../components/selectComponent/IcustomSelectProp"
import { DateFilterProps } from "../components/customDatePicker/DateFilterProps"
import { ItoggleProps } from "../components/toggle/ItoggleProps"

const useListadosPartesManager = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [ordenData, setOrdenData] = useState<"asc" | "desc">("desc")
  const [datosLineaMod, setDatosLineaMod] = useState<ColumnDescriptor[]>([])
  const [fullData, setFullData] = useState<Producto[]>([])

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

  const {
    mapColumnDescriptorsToProducto,
    mapearProductoAColumnas,
    updateProductInOrden,
    updateColumnProduct,
    updateOrdenProduccion,
    getAllProductAndAllOrder,
    getOrdenProduccionById
  } = useOrdenProduccionData()

  const {
    listaTotalProduccion,
    setListaTotalProduccion,
    listaProductosOrdenReciente,
    setListaProductosOrdenReciente
  } = useOrdenProductionStore()

  const [selectPropiedades, setSelectedPropiedades] = useState<string>(
    listadoTitulosPropiedades[0]
  )

  const { filterData, filterByWords, filterDateRange } = useFilterData()

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

      /*if (listaPartesLaminacion) {
        filterData(
          listaPartesLaminacion,
          selectPropiedades,
          toggleState.sortDirection
        ).then((result) => {
         //setListaTotalProduccion(result)
          //setListaProductosOrdenReciente(result)
          setListaPartesLaminacion(result)
        })
      }*/

      if (listaTotalProduccion) {
        filterData(
          listaTotalProduccion,
          selectPropiedades,
          toggleState.sortDirection
        ).then((result) => {
          setListaTotalProduccion(result)
          //setListaProductosOrdenReciente(result)
        })
      }

      // Puedes realizar acciones adicionales basadas en el estado del toggle
    }
  }

  // Hook para la fecha 'Desde'
  const {
    selectedDate: selectedStartDate,
    changeSelectedDate: changeSelectedStartDate
  } = useCustomDatepicker(new Date(), {
    onSelectedDateChanged: (date: Date) => {
      console.log("Fecha selectStartDate:", date)
      validateDates(date, selectedEndDate)
    }
  })

  // Hook para la fecha 'Hasta'
  const {
    selectedDate: selectedEndDate,
    changeSelectedDate: changeSelectedEndDate
  } = useCustomDatepicker(new Date(), {
    onSelectedDateChanged: (date: Date) => {
      console.log("Fecha selectEndDate:", date)
      validateDates(selectedStartDate, date)
    }
  })

  const validateDates = (startDate: Date, endDate: Date) => {
    if (startDate && endDate) {
      if (startDate <= endDate) {
        /*if (listaPartesLaminacion) {
          filterDateRange(
            listaPartesLaminacion,
            "fecha",
            startDate,
            endDate,
            ordenData
          ).then((result) => {
            console.log(result)
            setListaPartesLaminacion(result)
          })
        }*/

        //console.log(convertDateToFormatString(startDate,"dd/MM/yyyy"),convertDateToFormatString(endDate,"dd/MM/yyyy"))

        if (fullData) {
          filterDateRange(
            fullData,
            "fecha",
            startDate,
            endDate,
            ordenData
          ).then((result) => {
            console.log(result.length)
            setListaTotalProduccion(result)
            //setListaPartesLaminacion(result)
          })
        }
      }
    }
  }

  const [listaPartesLaminacion, setListaPartesLaminacion] =
    useState<Producto[]>()

  const {
    currentPage,
    itemsPerPage,
    loadedData,
    setLoadedData,
    calculateItemToDisplay,
    loadMoreData
  } = useInfiniteLoader(20)

  const cargarDatosListaPartesProduccion = () => {
    getAllProductAndAllOrder().then((response) => {
      if (response) {
        setFullData(response)
        setListaTotalProduccion(response)
        setListaProductosOrdenReciente(response)
      }
    })
  }

  const handleInputTextChange = () => {}
  const handleInputTextClick = () => {}

  const handleButtonClick = (idInput: string | number, rowIndex: number) => {
    const id = typeof idInput === "number" ? idInput.toString() : idInput

    if (id.toLowerCase() === "editar") {
      //console.log(id, rowIndex)
      setEditMode(true)

      if (listaTotalProduccion) {
        const productoEditar = mapearProductoAColumnas(
          ProductoModificacion,
          listaTotalProduccion[rowIndex].idParte,
          listaTotalProduccion[rowIndex]
        )
        //console.log(productoEditar)
        setDatosLineaMod(productoEditar)
      }
    } else if (id.toLowerCase() === "aceptaredicion") {
      /*
      if (datosLineaMod) {
        if (datosLineaMod[0].value) {
          const convertProduct = mapColumnDescriptorsToProducto(
            datosLineaMod,
            datosLineaMod[0].value as number
          )

          updateProductInOrden(convertProduct, datosLineaMod[0].value as number)
          const listadoPartes = getAllProductAndAllOrder()

          if (listadoPartes) {
            // setOrdenProduccion(ordenproducionActualizada)
            setListaTotalProduccion(listadoPartes)
          }

          setEditMode(false)
        }
      }
      */

      const ordenProduccion = getOrdenProduccionById(
        datosLineaMod[0].value as number
      )

      ordenProduccion.then((ordenResponse) => {
        if (datosLineaMod && ordenResponse) {
          const convertProduct = mapColumnDescriptorsToProducto(
            datosLineaMod,
            ordenResponse?.idParte
          )

          convertProduct.fecha = ordenResponse.fecha
          convertProduct.tipoGoma = ordenResponse.TipoGoma
          //modifico el producto de la ordenProduccion
          ordenResponse.ordenesProduccion = ordenResponse.ordenesProduccion.map(
            (product) => {
              if (product.indiceProducto === convertProduct.indiceProducto) {
                return convertProduct
              }
              return product
            }
          )

          //updateProductInOrden(convertProduct, ordenProduccion.idParte)
          updateOrdenProduccion(ordenResponse).then((response) => {
            if (response) {
              setListaTotalProduccion(ordenResponse.ordenesProduccion)
            }
          })

          setEditMode(false)
        }
      })
    }
  }

  const handleInputChange = (value: string | number, id: any) => {
    if (editMode) {
      const dataUpdated = updateColumnProduct(
        datosLineaMod,
        id,
        value,
        ProductoModificacion
      )

      //console.log("datosLineaMod",datosLineaMod)
      //console.log("productoModificado",ProductoModificacion)

      if (dataUpdated) {
        setDatosLineaMod(dataUpdated)
      }
    }
  }

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedPropiedades(value) // Actualiza el estado con el valor seleccionado
  }

  const handleFilterChange = async (id: string, value: string) => {
    if (id === "byWords") {
      try {
        const result = await filterByWords(value, selectPropiedades, "asc")
        //setListaPartesLaminacion(result);
        setListaTotalProduccion(result)
      } catch (error) {
        console.error("Error al filtrar por palabras: ", error)
        // Aquí puedes manejar el error como sea necesario
      }
    }
  }

  // Opcional: Maneja el filtro si es necesario
  const handleFilter = (filterValue: string) => {
    //console.log("Filtrar valores por:", filterValue)
    // Implementar lógica de filtrado aquí si es necesario

    /*
    if (listaPartesLaminacion) {
      filterData(listaPartesLaminacion, filterValue, "desc").then((result) => {
        // setListaPartesLaminacion(result)
        setListaTotalProduccion(result)
      })
    }
    */

    setSelectedPropiedades(filterValue)
    if (listaTotalProduccion) {
      filterData(listaTotalProduccion, filterValue, "desc").then((result) => {
        // setListaPartesLaminacion(result)
        setListaTotalProduccion(result)
      })
    }
  }

  const plantillaFiltersListados = [
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
    } as ItoggleProps
    // Puedes agregar más filtros según necesites
  ]

  return {
    listadoTitulosPropiedades,
    selectPropiedades,
    ordenData,
    listaPartesLaminacion,
    selectedStartDate,
    selectedEndDate,
    currentPage,
    itemsPerPage,
    loadedData,
    editMode,
    datosLineaMod,
    plantillaFiltersListados,
    setDatosLineaMod,
    setEditMode,
    setLoadedData,
    calculateItemToDisplay,
    loadMoreData,
    setListaPartesLaminacion,
    changeSelectedEndDate,
    changeSelectedStartDate,
    setOrdenData,
    handleToggleChange,
    cargarDatosListaPartesProduccion,
    handleFilter,
    handleSelection,
    handleInputChange,
    handleButtonClick,
    handleFilterChange,
    handleInputTextClick,
    handleInputTextChange
  }
}

export default useListadosPartesManager
