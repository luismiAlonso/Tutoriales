import { useState } from "react"
import useFilterData from "../components/filters/useFilterData"
import { useOrdenProduccionData } from "./useOrdenProduccionData"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { ProductoModificacion } from "../models/ProductoModificacion"
import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion"
import useCustomDatepicker from "../customHook/useCustomDatePicker"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import useInfiniteLoader from "../components/InfiniteLoaderComponent/useInfiniteLoader"

const useListadosPartesManager = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [ordenData, setOrdenData] = useState<"asc" | "desc">("desc")
  const [datosLineaMod, setDatosLineaMod] = useState<ColumnDescriptor[]>([])
  const [fullData,setFullData] = useState<Producto[]>([])

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
    getAllProductAndAllOrder 
  } = useOrdenProduccionData()

  const { listaTotalProduccion, setListaTotalProduccion } =
    useOrdenProductionStore()

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
      //console.log("Fecha selectStartDate:", selectedEndDate)
      validateDates(date, selectedEndDate)
    }
  })

  // Hook para la fecha 'Hasta'
  const {
    selectedDate: selectedEndDate,
    changeSelectedDate: changeSelectedEndDate
  } = useCustomDatepicker(new Date(), {
    onSelectedDateChanged: (date: Date) => {
      //console.log("Fecha selectEndDate:", selectedStartDate)
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
    const listadoPartes = getAllProductAndAllOrder()
    if (listadoPartes) {
      //setListaPartesLaminacion(listadoPartes)
      //console.log(listadoPartes.length)
      setFullData(listadoPartes)
      setListaTotalProduccion(listadoPartes)
    }
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
        setDatosLineaMod(productoEditar)
      }

    } else if (id.toLowerCase() === "aceptaredicion") {

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

  const handleSelection = (value: string) => {
    console.log(value)
    setSelectedPropiedades(value) // Actualiza el estado con el valor seleccionado
  }

  const handleFilterChange = (id: string, value: string) => {

    if (id === "byWords") {

      /*
      if (listaPartesLaminacion) {
        filterByWords(
          listaPartesLaminacion,
          value,
          selectPropiedades,
          "asc"
        ).then((result) => {
          setListaPartesLaminacion(result)
        })
      */
      if (listaTotalProduccion) {
        filterByWords(
          listaTotalProduccion,
          value,
          selectPropiedades,
          "asc"
        ).then((result) => {
          //setListaPartesLaminacion(result)
          setListaTotalProduccion(result)
        })
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

    if (listaTotalProduccion) {
      filterData(listaTotalProduccion, filterValue, "desc").then((result) => {
        // setListaPartesLaminacion(result)
        setListaTotalProduccion(result)
      })
    }
  }

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
