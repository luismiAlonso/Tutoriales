import { useState } from "react"
import {
  sortData,
  sortDataByInputFill,
  sortDateRange
} from "../filters/utilFiters"
import useNotification from "../../contextStore/useNotificationStore"
import { useOrdenProductionStore } from "../../contextStore/useOrdenProductionStore"

function useFilterData() {

  const [sortedDataProperties, setSortedDataProperties] = useState<any[]>([])
  const [property, setProperty] = useState<string>("")
  const [ordenProperties, setOrdenProperties] = useState<"desc" | "asc">("asc")
  const [isFiltered, setFiltered] = useState(false)
  const { addNotification } = useNotification()
  //const { listaProductosOrdenReciente } = useOrdenProductionStore()

  const filterData = async (
    newData: any[],
    newProperty: string,
    newOrder: "desc" | "asc"
  ): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      try {
        setFiltered(false)
        if (!newData || newData.length === 0 || !newProperty || !newOrder) {
          addNotification({
            message: "Error en la entrada de datos",
            type: "error"
          })
          reject("No se pudieron ordenar los datos")
          return
        }
        const newSortedProperties = sortData(newData, newProperty, newOrder)
        setSortedDataProperties(newSortedProperties)
        setFiltered(true)
        resolve(newSortedProperties)
      } catch (error) {
        setFiltered(false)
        console.error("Error en filterData:", error)
        addNotification({
          message: `Error en filterData: ${error}`,
          type: "error"
        })
        reject(error)
      }
    })
  }

  /*
  const filterByWords = async (
    newData: any[],
    searchWord: string,
    newProperty: string,
    newOrder: "desc" | "asc"
  ): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      try {
        setFiltered(false)
        if (!newData || newData.length === 0) {
          //reject("No se pudieron ordenar los datos")
          console.log(listaProductosOrdenReciente)
          newData = listaProductosOrdenReciente
        }

        console.log(searchWord, newData)
        if (searchWord !== empty) {
          const filteredData = sortDataByInputFill(
            newData,
            searchWord,
            newProperty,
            newOrder
          )
          setSortedDataProperties(filteredData)
          setFiltered(true)
          resolve(filteredData)
        } else {
          setSortedDataProperties(newData)
          setFiltered(true)
          resolve(newData)
        }
      } catch (error) {
        setFiltered(false)
        addNotification({
          message: `Error en filterData by Words: ${error}`,
          type: "error"
        })
        reject(error)
      }
    })
  }
  */

  const filterByWords = async (
    data: any[],
    searchWord: string,
    newProperty: string,
    newOrder: "desc" | "asc"
  ): Promise<any[]> => {
    try {

      if (searchWord === "") {
        // Si la palabra de búsqueda está vacía, devuelve los datos como están
        return  data//listaProductosOrdenReciente
      }
      // Filtra y ordena los datos
      const filteredData = sortDataByInputFill(
        //listaProductosOrdenReciente,
        data,
        searchWord,
        newProperty,
        newOrder
      )

      //console.log("palabra filtrada",searchWord,newProperty)
      return filteredData
    } catch (error) {
      addNotification({
        message: `Error en filterData by Words: ${error}`,
        type: "error"
      })
      throw error // Lanza el error para manejarlo más arriba si es necesario
    }
  }

  const filterDateRange = async (
    newData: any[],
    propiedad: string,
    dateTo: Date,
    dateFrom: Date,
    orden: "asc" | "desc"
  ): Promise<any[]> => {

    try {
      const filteredData = sortDateRange(newData, dateFrom, dateTo,propiedad,orden)
      setSortedDataProperties(filteredData)
      setFiltered(true)

      return filteredData
    } catch (error) {
      addNotification({
        message: `Error en filterData by date range: ${error}`,
        type: "error"
      })
      // Rechazar la promesa con un error o devolver un arreglo vacío según sea apropiado
      return []
    }
  }

  // Otros métodos y lógica...

  return {
    sortedDataProperties,
    property,
    ordenProperties,
    isFiltered,
    filterDateRange,
    setOrdenProperties,
    setProperty,
    filterData,
    filterByWords
  }
}

export default useFilterData
