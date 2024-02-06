import { useState } from "react"
import { sortDataByInputFill } from "./utilFiters"
import useNotificationStore from "../../contextStore/useNotificationStore"

function useFilterInputText() {
  const [isFiltered, setFiltered] = useState(false) // Define el estado isFiltered
  // const { setCurrentDataStore } = useGlobalStore()
  const { addNotification } = useNotificationStore()

  const filterByWords = async (
    newData: string[],
    searchWord: string,
    newProperty: string,
    newOrder: "desc" | "asc"
  ) => {

    return new Promise((resolve, reject) => {
      try {
        setFiltered(false)

        if (!newData || newData.length === 0 || !newProperty || !newOrder) {
          reject("Invalid input") // Rechaza la promesa con un mensaje de error
          return
        }

        if (searchWord == "") {
          //setCurrentDataStore(newData)
          reject("void search")
          return
        }

        const filteredData = sortDataByInputFill(
          newData,
          searchWord,
          newProperty,
          newOrder
        )

        setFiltered(true)
       // setCurrentDataStore(filteredData)
        resolve(filteredData) // Resuelve la promesa con los datos filtrados
      } catch (error) {
        setFiltered(false)
        addNotification({
          message: `Error en filterData by Words: ${error}`,
          type: "error"
        })
        reject(error) // Rechaza la promesa con el error
      }
    })
  }

  return {
    isFiltered,
    filterByWords
  } // Devuelve el estado y la función de filtrado
}

export default useFilterInputText
