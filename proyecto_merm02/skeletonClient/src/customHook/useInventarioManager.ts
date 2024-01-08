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
import { date, map, string } from "zod"
import { ProductoInventario } from "../models/ProductoInventario"
import { ResumenProductoInventario } from "../models/ResumenProductoInventario"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import useModal from "../components/modal/useModal"
import { daysToWeeks } from "date-fns"

export const useInventarioManager = () => {
  const [resumeProduct, setResumeDataProduct] = useState<ProductoInventario>(null)
  const navigate = useNavigate() // Obtén la función navigate
  const {totalProductosInventario,setListaTotalProductosInventario } = useOrdenProductionStore()
  const { isOpen, setIsOpen, openModal, closeModal } = useModal()

  const {
    getInventarioSelected,
    crearNuevoInventario,
    updateInventario,
    mapColumnDescriptorsToProductoInventario,
    updateColumnDescriptor,
    deleteLineaInventario,
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

    //console.log(updateDataColumnDescriptor)
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
    console.log(idInput)
    if (idInput === "agregarEntrada") {
      const dataPrepareInventario = getDatosLocalStorage(
        "futureInventario"
      ) as PrepareDataInventario

      if (dataPrepareInventario) {
        try {
          const dbInventario = await getInventarioSelected(
            dataPrepareInventario.url
          )

          const mapDatosEntrada =
            mapColumnDescriptorsToProductoInventario(datosEntrada)

          mapDatosEntrada.fechaEntrada = obtenerFechaActual(
            "dd/MM/yyyy HH:mm:ss"
          )
          //relllenamos fechas y hora de salida
          mapDatosEntrada.fechaSalida = obtenerFechaActual(
            "dd/MM/yyyy HH:mm:ss"
          )
          mapDatosEntrada.stock = mapDatosEntrada.cantidadEntrante

          if (dbInventario) {
            // El inventario ya existe, agregamos
            mapDatosEntrada.idProducto = dbInventario.inventario.length + 1
            dbInventario.inventario.push(mapDatosEntrada)
            const actualizacionExitosa = await updateInventario(
              dataPrepareInventario.url,
              dbInventario // Aquí pasamos el inventario completo, no solo mapDatosEntrada
            )

            if (actualizacionExitosa) {
              console.log(
                "Se ha actualizado el inventario con una entrada nueva",
                dbInventario
              )
              dataPrepareInventario.inventarioAlmacen = dbInventario
              setDatosLocalStorage("futureInventario", dataPrepareInventario)
              setListaTotalProductosInventario(dbInventario.inventario)
            }
          } else {
            // El inventario no existe, creamos
            mapDatosEntrada.idProducto = 1
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
            }
          }
        } catch (error) {
          console.error("Error en handleButtonClick:", error)
        }
      }
    } else if (idInput === "Borrar") {
      //setResumeDataProduct(listaTotalProduccion[rowIndex])
      const dataInventarioTemp = getDatosLocalStorage("futureInventario") as PrepareDataInventario
      console.log(dataInventarioTemp.url+"/producto/"+rowIndex)
      navigate(`${dataInventarioTemp.url}/producto/${rowIndex}`)
      setResumeDataProduct(totalProductosInventario[rowIndex])
      handleOpenModal()
    }
  }

  const prepareDataInventarioEntradas = (
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

    getInventarioSelected(url).then((response) => {
      if (response) {
        if (response.inventario) {
          //recibo respuesta porque el inventario ya existe
          dataInventario.inventarioAlmacen.inventario = response.inventario
          setDatosLocalStorage("futureInventario", dataInventario)
          setListaTotalProductosInventario(
            dataInventario.inventarioAlmacen.inventario
          )
        }
      } else {
        setDatosLocalStorage("futureInventario", dataInventario)
        setListaTotalProductosInventario(
          dataInventario.inventarioAlmacen.inventario
        )
      }
    })

    /*getUltimoInventarioAlmacen().then((response) => {
      if (response) {
        const dataInventario = {
          url: url + response.idInventarioAlmacen,
          id: response.idInventarioAlmacen,
          seccion: seccion,
          naveSeleccionada: naveSeleccionada
        }
        const serializeDataInventario = JSON.stringify(dataInventario)
        setDatosLocalStorage("futureInventario", serializeDataInventario)
        navigate(url + response.idInventarioAlmacen)
      } else {
        const dataInventario = {
          url: `${url}1`,
          seccion: seccion,
          id: 1,
          naveSeleccionada: naveSeleccionada
        }
        const serializeDataInventario = JSON.stringify(dataInventario)
        setDatosLocalStorage("futureInventario", serializeDataInventario)
        navigate(`${url}1`)
      }
    })*/
  }

  const handleDeleteProducto = (
    e: React.MouseEvent<HTMLButtonElement>,
    idInput: string | number | undefined
  ) => {
    if (idInput === "btDelete") {
    
      const dataPrepareInventario = getDatosLocalStorage(
        "futureInventario"
      ) as PrepareDataInventario
      if(dataPrepareInventario){
        deleteLineaInventario(dataPrepareInventario.url,resumeProduct.idProducto).then((response)=>{
          if(response){
            console.log("el producto se ha eliminadocon exito")
          }
        })
      }
    }
  }

  const actualizaInvinterario = () => {
    const datosTemporales = getDatosLocalStorage(
      "futureInventario"
    ) as PrepareDataInventario

    if (
      datosTemporales &&
      datosTemporales.inventarioAlmacen.inventario.length > 0
    ) {
      console.log(datosTemporales)
      setListaTotalProductosInventario(
        datosTemporales.inventarioAlmacen.inventario
      )
    }
  }

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
    ResumenProductoInventario,
    resumeProduct,
    isOpen,
    currentPage,
    itemsPerPage,
    loadedData,
    datosEntrada
  }
}
