import { useState } from "react"
import { InventarioAlmacen } from "../interfaces/Inventario"
import { useInventarioData } from "../customHook/useInventarioData"
import { setDatosLocalStorage, getDatosLocalStorage } from "../utilidades/util"
import { obtenerFechaActual } from "../utilidades/dateUtil"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { useNavigate } from "react-router-dom" // Importa useNavigate
import { date, string } from "zod"

interface prepareDataInventari {
  url: string
  seccion: string
  naveSeleccionada: string
}

export const useInventarioManager = () => {
  const navigate = useNavigate() // Obtén la función navigate

  const {
    getInventarioSelected,
    crearNuevoInventario,
    updateInventario,
    mapColumnDescriptorsToProductoInventario,
    updateColumnDescriptor,
    productoInicial
  } = useInventarioData()
  const [datosEntrada, setEntrada] =
    useState<ColumnDescriptor[]>(productoInicial)

  const handleInputChange = (value: string | number, id: any) => {
    console.log(value, id)
    const updateDataColumnDescriptor = updateColumnDescriptor(
      datosEntrada,
      id,
      value,
      productoInicial
    )

    setEntrada(productoInicial)
    setDatosLocalStorage("tempDataEntrada", updateDataColumnDescriptor)

    //console.log(updateDataColumnDescriptor)
  }

  /*
  export interface InventarioAlmacen {
    seccion: string,
    almacen: string,
    inventario: ProductoInventario[]
  }
  
  export interface ProductoInventario {
      fechaEntrada:string,
      fechaSalida:string,
      horaEntrada:string,
      horaSalida:string,
      idProducto:number,
      stock:number,
      cantidadSalida:number,
      cantidadRestante:number,
      plancha:string,
      color:string,
      dibujo:string,
      molde:string,
      acabado:string,
      calibre:string
  }
  */

  /* const handleButtonClick = (idInput: string | number, rowIndex: number) => {
    if (idInput === "agregarEntrada") {
      const dataPrepareInventario = getDatosLocalStorage(
        "futureInventario"
      ) as prepareDataInventari
      if (dataPrepareInventario) {
        const response = getInventarioSelected(
          dataPrepareInventario.url,
          dataPrepareInventario.seccion,
          dataPrepareInventario.naveSeleccionada
        )
        const mapDatosEntrada =
        mapColumnDescriptorsToProductoInventario(datosEntrada) 
        mapDatosEntrada.horaEntrada=obtenerFechaActual("yyyy-MM-dd HH:mm:ss")
        response.then((result) => {
          // el inventario ya existe agregamos
          if (result) {  

            mapDatosEntrada.idProducto=result.inventario.length+1
            result.inventario.push(mapDatosEntrada)
            updateInventario(dataPrepareInventario.url,dataPrepareInventario.seccion,dataPrepareInventario.naveSeleccionada,mapDatosEntrada).then((result)=>{

              if(result){
                console.log("se ha actualizado el inventario con una entrada nueva")
              }
            })

          }else{ 
            // el inventario no existe creamos
            mapDatosEntrada.idProducto=1
            const nuevoInventario = {
              seccion:dataPrepareInventario.seccion,
              alamacen:dataPrepareInventario.seccion,
              inventario:[mapDatosEntrada]
            } 
            crearNuevoInventario(dataPrepareInventario.url,nuevoInventario)
            
          }
        })
      }
    }
  }*/

  const handleButtonClick = async (
    idInput: string | number,
    rowIndex: number
  ) => {

    if (idInput === "agregarEntrada") {
      const dataPrepareInventario = getDatosLocalStorage(
        "futureInventario"
      ) as prepareDataInventari

      if (dataPrepareInventario) {
        console.log(dataPrepareInventario.seccion,dataPrepareInventario.naveSeleccionada)
        try {
          const result = await getInventarioSelected(
            dataPrepareInventario.url,
            dataPrepareInventario.seccion,
            dataPrepareInventario.naveSeleccionada
          )

          const mapDatosEntrada =
            mapColumnDescriptorsToProductoInventario(datosEntrada)
          mapDatosEntrada.horaEntrada = obtenerFechaActual(
            "yyyy-MM-dd HH:mm:ss"
          )

          if (result) {
            // El inventario ya existe, agregamos
            mapDatosEntrada.idProducto = result.inventario.length + 1
            result.inventario.push(mapDatosEntrada)

            const actualizacionExitosa = await updateInventario(
              dataPrepareInventario.url,
              dataPrepareInventario.seccion,
              dataPrepareInventario.naveSeleccionada,
              result // Aquí pasamos el inventario completo, no solo mapDatosEntrada
            )

            if (actualizacionExitosa) {
              console.log(
                "Se ha actualizado el inventario con una entrada nueva"
              )
            }
          } else {

            // El inventario no existe, creamos
            mapDatosEntrada.idProducto = 1
            const nuevoInventario = {
              seccion: dataPrepareInventario.seccion,
              almacen: dataPrepareInventario.naveSeleccionada, // Asegúrate de que esto sea correcto
              inventario: [mapDatosEntrada]
            }

            const creacionExitosa = await crearNuevoInventario(
              dataPrepareInventario.url,
              nuevoInventario 
            )

            if (creacionExitosa) {
              console.log("Se ha creado un nuevo inventario con la entrada")
            }
          }
        } catch (error) {
          console.error("Error en handleButtonClick:", error)
        }
      }
    }
  }

  const prepareDataInventarioEntradas = (
    url: string,
    seccion: string,
    naveSeleccionada: string
  ) => {
    const dataInventario = {
      url: url,
      seccion: seccion,
      naveSeleccionada: naveSeleccionada
    }
    setDatosLocalStorage("futureInventario",dataInventario)
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

  return {
    handleInputChange,
    handleButtonClick,
    crearNuevoInventario,
    prepareDataInventarioEntradas,
    productoInicial
  }
}
