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
import { ProducInventarioModificacion } from "../models/ProductoInventarioModificacion"
import { ResumenProductoInventario } from "../models/ResumenProductoInventario"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import useModal from "../components/modal/useModal"
import { daysToWeeks } from "date-fns"

export const useInventarioManager = () => {
  const [resumeProduct, setResumeDataProduct] =
    useState<ProductoInventario>(null)
  const navigate = useNavigate() // Obtén la función navigate
  const { totalProductosInventario, setListaTotalProductosInventario } =
    useOrdenProductionStore()
  const [url, setUrl] = useState<string>()
  const { isOpen, setIsOpen, openModal, closeModal } = useModal()
  const [editMode, setEditMode] = useState<boolean>(false)

  const {
    getInventarioSelected,
    crearNuevoInventario,
    updateProductoIventario,
    updateInventario,
    mapearProductoInventarioAColumnas,
    mapColumnDescriptorsToProductoInventario,
    updateColumnDescriptor,
    getLastproductInventario,
    deleteLineaInventario,
    getLastProductInventarioByClaveComp,
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

          const dbInventario = (await getInventarioSelected(
            dataPrepareInventario.url
          )) as InventarioAlmacen

          const mapDatosEntrada = mapColumnDescriptorsToProductoInventario(
            datosEntrada,
            ["agregarEntrada"]
          )

          mapDatosEntrada.fechaEntrada = obtenerFechaActual(
            "dd/MM/yyyy HH:mm:ss"
          )

          //relllenamos fechas y hora de salida
          mapDatosEntrada.fechaSalida = obtenerFechaActual(
            "dd/MM/yyyy HH:mm:ss"
          )
          
          if (dbInventario) {

            mapDatosEntrada.claveComp = generadorClaveCompuesta(mapDatosEntrada)

            console.log("claveCompleta",mapDatosEntrada.claveComp)
            const lastProductExist = getLastProductInventarioByClaveComp(
              dbInventario,
              mapDatosEntrada.claveComp
            )
            
            const lastProduct = getLastproductInventario(dbInventario)
            mapDatosEntrada.idProducto = lastProduct.idProducto + 1

            if (lastProductExist) { //en este caso obtenemos el ultimo producto que coincida con la clave compuesta

              mapDatosEntrada.stock = mapDatosEntrada.cantidadEntrante + lastProductExist.stock
                console.log("stock cantidad existente",mapDatosEntrada.stock)
              
            }else{ // si no hay coincidencia es que el producto es nuevo
              mapDatosEntrada.stock = mapDatosEntrada.cantidadEntrante
            }

            dbInventario.inventario.push(mapDatosEntrada)
            //actualizamos inventario con los nuevos datos

            updateProductoIventario(
              `${dataPrepareInventario.url}/${mapDatosEntrada.idProducto}`,
              dbInventario
            ).then((response)=>{
              if(response){
                dataPrepareInventario.inventarioAlmacen = dbInventario
                setDatosLocalStorage("futureInventario", dataPrepareInventario)
                setListaTotalProductosInventario(dbInventario.inventario)
              }
            })

          } else {
            // El inventario no existe, creamos
            mapDatosEntrada.idProducto = 1
            mapDatosEntrada.claveComp = generadorClaveCompuesta(mapDatosEntrada)
            //la cantidad de stock al iniciar es lo mismo que la cantidad entrante inicial
            mapDatosEntrada.stock = mapDatosEntrada.cantidadEntrante
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
            }
          }
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
        const productoEditar = mapearProductoInventarioAColumnas(
          ProducInventarioModificacion,
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

  const actualizaInvinterario = () => {
    const datosTemporales = getDatosLocalStorage(
      "futureInventario"
    ) as PrepareDataInventario

    //console.log(datosTemporales)
    getInventarioSelected(datosTemporales.url).then((response) => {
      if (response) {
        if (response.inventario) {
          //recibo respuesta porque el inventario ya existe
          datosTemporales.inventarioAlmacen.inventario = response.inventario
          setDatosLocalStorage("futureInventario", datosTemporales)
          setListaTotalProductosInventario(response.inventario)
        }
      } else {
        console.log(
          "la base de datos no contiene inventario con esa definicion"
        )
      }
    })
  }

  const generadorClaveCompuesta = (producto: ProductoInventario) => {
    const compClave = `${producto.plancha}-${producto.molde}-${producto.dibujo}-${producto.color}-${producto.calibre}-${producto.acabado01}-${producto.acabado02}`
    return compClave
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
    handleBackEditMod,
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
