import { useState } from "react"
import { sortData, sortDataByInputFill } from "../filters/utilFiters"
import useNotification from "../../contextStore/useNotificationStore"

function useFilterData() {
  const [sortedDataProperties, setSortedDataProperties] = useState<any[]>([])
  const [property, setProperty] = useState<string>("")
  const [ordenProperties, setOrdenProperties] = useState<"desc" | "asc">("asc")
  const [isFiltered, setFiltered] = useState(false)
  const { addNotification } = useNotification()

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

  const filterByWords = async (
    newData: any[],
    searchWord: string,
    newProperty: string,
    newOrder: "desc" | "asc"
  ): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      try {
        setFiltered(false)
        if (!newData || newData.length === 0 || !newProperty || !newOrder) {
          reject("No se pudieron ordenar los datos")
          return
        }
        const filteredData = sortDataByInputFill(
          newData,
          searchWord,
          newProperty,
          newOrder
        )
        setSortedDataProperties(filteredData)
        setFiltered(true)
        resolve(filteredData)
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

  // Otros métodos y lógica...

  return {
    sortedDataProperties,
    property,
    ordenProperties,
    isFiltered,
    setOrdenProperties,
    setProperty,
    filterData,
    filterByWords
  }
}

export default useFilterData
