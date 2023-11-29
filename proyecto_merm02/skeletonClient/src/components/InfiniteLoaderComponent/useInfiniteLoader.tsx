// useInfiniteLoader.js
import { useState, useCallback, useEffect } from "react"
import { useOrdenProductionStore } from "../../contextStore/useOrdenProductionStore"
import { Producto } from "../../interfaces/OrdenProduccion"

const useInfiniteLoader = (itemsPerPage = 100) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { listaTotalProduccion, setListaTotalProduccion } =
    useOrdenProductionStore()
  const [loadedData, setLoadedData] = useState<Producto[]>([])

  /*
  const loadMoreData = useCallback(() => {
    setCurrentPage((prevPage) => {
      const startIndex = (prevPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const newData = listaTotalProduccion.slice(startIndex, endIndex)
      console.log(newData.length, itemsPerPage)
      // Comprueba si has alcanzado el final de los datos
      if (newData.length < itemsPerPage) {
        console.log("Reached the end of data")
        return prevPage // No incrementes currentPage si has alcanzado el final
      }

      // Actualiza la lista total de producción con los nuevos datos
      const updatedData = [...listaTotalProduccion, ...newData]
      setListaTotalProduccion(updatedData)
      //setListaTotalProduccion((prevData) => [...prevData, ...newData]);

      return prevPage + 1 // Solo incrementa currentPage si hay más datos para cargar
    })
  }, [listaTotalProduccion, itemsPerPage, setListaTotalProduccion])
  */

  const loadMoreData = useCallback(() => {

    const totalItems = listaTotalProduccion.length
    const nextEndIndex = currentPage * itemsPerPage

    //console.log(nextEndIndex,totalItems)
    
    if (nextEndIndex < totalItems) {

      setCurrentPage((prevPage) => prevPage + 1)
     
    } else {
      console.log("Reached the end of data")
    }

    const itemsDisplay = calculateItemToDisplay()
    setLoadedData(itemsDisplay)

  }, [currentPage, itemsPerPage, listaTotalProduccion])

  // Calcula el índice del último elemento a mostrar
  const lastItemIndex = currentPage * itemsPerPage < listaTotalProduccion.length

  const calculateItemToDisplay = () =>{
    return listaTotalProduccion.slice(0, currentPage * itemsPerPage);
  }

  useEffect(()=>{
   setLoadedData(calculateItemToDisplay())
   //console.log(listaTotalProduccion)
  },[listaTotalProduccion])

  return {
    loadMoreData,
    calculateItemToDisplay,
    setLoadedData,
    loadedData,
    currentPage,
    itemsPerPage,
    lastItemIndex
    // Agrega esta línea
  }
}

export default useInfiniteLoader
