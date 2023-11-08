import { useState } from "react"
import { sortData, sortDataByInputFill } from "./utilFilters"
import useGlobalStore from "../../globalStore/GlobalStore"

// Define un tipo básico que será extendido por T
type BasicObject = Record<string, string | number | Date>

function useFilterFill<T extends BasicObject>() {
  const [sortedDataProperties, setSortedDataProperties] = useState<T[]>([])
  const [property, setProperty] = useState<keyof T | null>(null)
  const [ordenProperties, setOrdenProperties] = useState<"desc" | "asc">("desc")
  const [isFiltered, setFiltered] = useState(false)

  const { setCurrentDataStore, addNotification } = useGlobalStore()

  const filterData = async (
    newData: T[],
    newProperty: keyof T,
    newOrder: "desc" | "asc"
  ) => {
    return new Promise<T[]>((resolve, reject) => {
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
        setCurrentDataStore(newSortedProperties) // Asegúrate de que setCurrentDataStore pueda manejar T[]
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
