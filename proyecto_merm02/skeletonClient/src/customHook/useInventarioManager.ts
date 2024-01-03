import { useState } from "react"
import { InventarioAlmacen } from "../interfaces/Inventario"
import { useInventarioData } from "../customHook/useInventarioData"
import {setDatosLocalStorage,getDatosLocalStorage} from "../utilidades/util"
import { useNavigate } from "react-router-dom" // Importa useNavigate
import { string } from "zod"

interface prepareDataInventari {
  url: string
  id: number
  seccion: string
  naveSeleccionada: string
}

export const useInventarioManager = () => {

  const navigate = useNavigate() // Obtén la función navigate

  const { getUltimoInventarioAlmacen , crearNuevoInventario, agregarNuevaEntrada,productoInicial } = useInventarioData()

  const handleInputChange = (value: string | number, id: any) => {
    console.log(value, id)
  }

  const handleButtonClick = (idInput: string | number, rowIndex: number) => {

    if(idInput==="agregarEntrada"){
      //console.log(idInput, rowIndex)
     const dataPrepareInventario= getDatosLocalStorage("futureInventario")

     getUltimoInventarioAlmacen().then((response)=>{
      
      if(response){

        if(dataPrepareInventario){
          const serializedDataPrepareInventario = JSON.parse(dataPrepareInventario) as prepareDataInventari
          //console.log(serializedDataPrepareInventario)
          //en caso de que no se encuen
          if(serializedDataPrepareInventario.id!==response.idInventarioAlmacen){
            crearNuevoInventario(serializedDataPrepareInventario.url,serializedDataPrepareInventario.seccion,serializedDataPrepareInventario.naveSeleccionada)
          }
          
         // agregarNuevaEntrada()
        }
      }
     })

    }
  }

  const prepareDataInventarioEntradas = (url:string,seccion:string,naveSeleccionada:string)=>{

    getUltimoInventarioAlmacen().then((response) => {
      if (response) {
        const dataInventario= {url:url+response.idInventarioAlmacen,id:response.idInventarioAlmacen,seccion:seccion,naveSeleccionada:naveSeleccionada}
        const serializeDataInventario = JSON.stringify(dataInventario)
        setDatosLocalStorage("futureInventario",serializeDataInventario)
        navigate(url+response.idInventarioAlmacen)
      } else {
        const dataInventario= {url:`${url}1`,seccion:seccion,id:1,naveSeleccionada:naveSeleccionada}
        const serializeDataInventario = JSON.stringify(dataInventario)
        setDatosLocalStorage("futureInventario",serializeDataInventario)
        navigate(`${url}1`)
      }
    })
  }

  return {handleInputChange, handleButtonClick,getUltimoInventarioAlmacen,crearNuevoInventario,prepareDataInventarioEntradas,productoInicial}
}
