// useInfiniteLoader.js
import { useState, useCallback, useEffect } from "react"
import { useOrdenProductionStore } from "../../contextStore/useOrdenProductionStore"
import { Producto } from "../../interfaces/OrdenProduccion"

const useInfiniteLoaderParteProducion = (itemsPerPage = 100) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { listaTotalProduccion, setListaTotalProduccion } =
    useOrdenProductionStore()
  const [loadedData, setLoadedData] = useState<Producto[]>([])

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

export default  useInfiniteLoaderParteProducion
