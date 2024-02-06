
interface PaginatorProps {
  currentPage: number
  totalPages: number
  visible: boolean
  nextPage: () => void
  prevPage: () => void
}

function Paginator({
  currentPage,
  totalPages,
  visible = false,
  nextPage,
  prevPage
}: PaginatorProps) {
  //const [newData,setDataNew] = useState()


  return (
    <>
      {visible && (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-2 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500'
                : 'bg-blue-500 text-white'
            }`}
          >
            Anterior
          </button>
          <p className="text-gray-600">
            Página {currentPage} de {totalPages}
          </p>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-2 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500'
                : 'bg-blue-500 text-white'
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  )
}

export default Paginator
