import { useState } from "react"
import { sortData } from "./utilFiters"
import useNotificationStore from "../../contextStore/useNotificationStore"

// Define un tipo básico que será extendido por T

function useFilterFill() {
  const [sortedDataProperties, setSortedDataProperties] = useState<any[]>([])
  const [setProperty] = useState<any | null>(null)
  const [ordenProperties, setOrdenProperties] = useState<"desc" | "asc">("desc")
  const [isFiltered, setFiltered] = useState(false)

  const { addNotification } = useNotificationStore()

  const filterData = async (
    newData: any[],
    newProperty: string,
    newOrder: "desc" | "asc"
  ) => {
    return new Promise((resolve, reject) => {
      try {
        setFiltered(false)
        if (!newData || newData.length === 0 || !newProperty || !newOrder) {
          addNotification({
            message: "Error en la entrada de datos",
            type: "error"
          })
          reject(new Error("Invalid input data"))
          return
        }

        setProperty(newProperty)
        setOrdenProperties(newOrder)
        const newSortedProperties = sortData(newData, newProperty, newOrder)

        setSortedDataProperties(newSortedProperties)

        setFiltered(true)
        //setCurrentDataStore(newSortedProperties) // Asegúrate de que setCurrentDataStore pueda manejar T[]
        resolve(newSortedProperties) // Indica que los datos están ordenados y listos

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

  // Agrega aquí la función filterByWords y otras funciones que necesites, asegurándote de que utilicen T[]

  return {
    sortedDataProperties,
    ordenProperties,
    isFiltered,
    setOrdenProperties,
    setProperty,
    filterData
    // No olvides retornar aquí también filterByWords y otras funciones que agregues
  }
}

export default useFilterFill
