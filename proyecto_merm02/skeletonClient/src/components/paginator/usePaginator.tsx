import { useState, useEffect } from 'react'
import {useGlobalStore} from '../../contextStore/useGlobalStore'

const usePaginator = (data: string[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [changePage, setChangePage] = useState(false)
  const [currentDataPage, setCurrentDataPage] = useState(data)
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / itemsPerPage)
  )
  const [amountData, setAmountData] = useState(data)
  const {dataGlobalStore,setDataGlobalStore} = useGlobalStore()

  const getPageData = () => {
     //nuevo
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return currentDataPage.slice(startIndex, endIndex)
  }

  const getNextPage = () => {
     //nuevo
    if (currentPage + 1 <= data.length) {
      let newCurrentPage = currentPage
      newCurrentPage++
      setCurrentPage(newCurrentPage)
      const startIndex = (newCurrentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return currentDataPage.slice(startIndex, endIndex)
    } else {
      currentDataPage
    }
  }

  const nextPage = () => {
     //nuevo
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      setChangePage(true)
    }
  }

  const prevPage = () => {
     //nuevo
    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1)
      setChangePage(false)
    }
  }

  const resetPaginator = (newData: string[]) => {
     //nuevo
    setChangePage(false)
    setCurrentPage(1)
    setTotalPages(Math.ceil(newData.length / itemsPerPage))
    setCurrentDataPage(newData)
  }

  const lazyLoad = () => {
    //nuevo
    const dataSlize = getPageData()
    setAmountData([...amountData, ...dataSlize])
    //console.log(amountData)
    return amountData
  }

  useEffect(() => {
    
    setCurrentDataPage(dataGlobalStore)
    setTotalPages(Math.ceil(dataGlobalStore.length / itemsPerPage)) // Recalcular totalPages
   
  }, [dataGlobalStore,itemsPerPage])

  useEffect(()=>{
    const pageData = getPageData() 
    if(pageData && pageData.length>0){
      setDataGlobalStore(pageData)
    }
  },[currentDataPage,setDataGlobalStore])

  
  return {
    itemsPerPage,
    currentPage,
    totalPages,
    changePage,
    currentDataPage,
    getNextPage,
    lazyLoad,
    setCurrentPage,
    setCurrentDataPage,
    resetPaginator,
    getPageData,
    nextPage,
    prevPage
  }
}

export default usePaginator
