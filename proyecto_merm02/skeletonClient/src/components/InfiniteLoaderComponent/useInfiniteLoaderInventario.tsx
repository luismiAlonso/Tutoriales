// useInfiniteLoader.js
import { useState, useCallback, useEffect } from "react"
import { useOrdenProductionStore } from "../../contextStore/useOrdenProductionStore"
import { ProductoInventario } from "../../interfaces/Inventario"

const useInfiniteLoaderInventario = (itemsPerPage = 100) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { totalProductosInventario, setListaTotalProductosInventario } =
    useOrdenProductionStore()
  const [loadedData, setLoadedData] = useState<ProductoInventario[]>([])

  const loadMoreData = useCallback(() => {

    const totalItems = totalProductosInventario.length
    const nextEndIndex = currentPage * itemsPerPage

    //console.log(nextEndIndex,totalItems)
    
    if (nextEndIndex < totalItems) {

      setCurrentPage((prevPage) => prevPage + 1)
     
    } else {
      console.log("Reached the end of data")
    }

    const itemsDisplay = calculateItemToDisplay()
    setLoadedData(itemsDisplay)

  }, [currentPage, itemsPerPage, totalProductosInventario])

  // Calcula el índice del último elemento a mostrar
  const lastItemIndex = currentPage * itemsPerPage < totalProductosInventario.length

  const calculateItemToDisplay = () =>{
    return totalProductosInventario.slice(0, currentPage * itemsPerPage);
  }

  useEffect(()=>{
   setLoadedData(calculateItemToDisplay())
  // console.log(totalProductosInventario)
  },[totalProductosInventario])

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

export default useInfiniteLoaderInventario

